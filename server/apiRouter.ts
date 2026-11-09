/**
 * Express API Router for Contact Inquiries and Admin Inbox
 */

import { Router, Request, Response } from 'express';
import { InboxService } from './inboxStore.ts';

export const apiRouter = Router();

// Middleware: Authenticate Admin Token
function requireAdminAuth(req: Request, res: Response, next: () => void) {
  const authHeader = req.headers.authorization;
  if (!InboxService.verifyToken(authHeader)) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired admin credentials' });
  }
  next();
}

// 1. Submit Contact Message
apiRouter.post('/contact', (req: Request, res: Response) => {
  try {
    const { name, email, subject, message, honeypot } = req.body || {};

    // Anti-spam honeypot detection
    if (honeypot && honeypot.trim() !== '') {
      // Silently pretend success to mislead bots
      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    }

    // Input validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide a valid name (at least 2 characters).' });
    }

    if (
      !email ||
      typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 2) {
      return res.status(400).json({ error: 'Please enter a subject (at least 2 characters).' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({ error: 'Please enter a message (at least 5 characters).' });
    }

    // Rate limiting
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
    const rateCheck = InboxService.checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      const waitMinutes = Math.ceil((rateCheck.remainingMs || 60000) / 60000);
      return res.status(429).json({
        error: `Too many submissions. Please wait ${waitMinutes} minute(s) before trying again.`,
      });
    }

    // Store message safely
    const stored = InboxService.addMessage({
      name,
      email,
      subject,
      message,
      ip: clientIp,
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you, Debdulal has received your message and will respond shortly.',
      id: stored.id,
    });
  } catch (err) {
    console.error('Error handling contact form:', err);
    return res.status(500).json({ error: 'Failed to process message. Please try again later.' });
  }
});

// 2. Admin Login
apiRouter.post('/admin/login', (req: Request, res: Response) => {
  try {
    const { passcode } = req.body || {};
    if (!passcode) {
      return res.status(400).json({ error: 'Passcode is required.' });
    }

    const authResult = InboxService.validatePasscode(passcode);
    if (!authResult.success) {
      return res.status(401).json({ error: 'Invalid admin passcode.' });
    }

    return res.json({
      success: true,
      token: authResult.token,
      message: 'Welcome back, Debdulal.',
    });
  } catch (err) {
    console.error('Admin login error:', err);
    return res.status(500).json({ error: 'Internal login error.' });
  }
});

// 3. Admin: Check Session Status
apiRouter.get('/admin/status', (req: Request, res: Response) => {
  const isAuth = InboxService.verifyToken(req.headers.authorization);
  return res.json({ authenticated: isAuth });
});

// 4. Admin: Get All Messages
apiRouter.get('/admin/messages', requireAdminAuth, (_req: Request, res: Response) => {
  const all = InboxService.getAllMessages();
  return res.json({ success: true, count: all.length, messages: all });
});

// 5. Admin: Mark Read/Unread
apiRouter.patch('/admin/messages/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { read } = req.body;
  const updated = InboxService.toggleRead(id, typeof read === 'boolean' ? read : undefined);
  if (!updated) {
    return res.status(404).json({ error: 'Message not found.' });
  }
  return res.json({ success: true, message: updated });
});

// 6. Admin: Delete Message
apiRouter.delete('/admin/messages/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = InboxService.deleteMessage(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Message not found.' });
  }
  return res.json({ success: true, message: 'Message removed.' });
});
