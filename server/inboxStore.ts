/**
 * Backend Message Store & Authentication Service
 * Manages secure persistent message storage, rate limiting, and admin authentication.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  ipHash?: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.resolve(DATA_DIR, 'messages.json');

// Memory cache
let messages: ContactMessage[] = [];
const rateLimitMap = new Map<string, { count: number; firstAttempt: number }>();
const validAdminSessions = new Set<string>();

// Ensure data folder and load initial data
function initializeStorage() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      messages = JSON.parse(raw);
    } else {
      // Seed with initial sample communication
      messages = [
        {
          id: 'welcome-001',
          name: 'System Welcome',
          email: 'system@debdulalsahoo.dev',
          subject: 'Portfolio Inquiries Inbox Ready',
          message:
            'Welcome Debdulal! Your secure portfolio inbox is initialized. Visitors who submit the contact form will have their inquiries stored here safely.',
          createdAt: new Date().toISOString(),
          read: true,
        },
      ];
      fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Storage initialization notice:', err);
    // In-memory fallback
    if (messages.length === 0) {
      messages = [];
    }
  }
}

initializeStorage();

function saveToDisk() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed saving messages to disk:', err);
  }
}

export const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'debdulal2027';

export const InboxService = {
  // Rate limiting check: max 5 messages per 10 minutes per IP
  checkRateLimit(clientIp: string): { allowed: boolean; remainingMs?: number } {
    const now = Date.now();
    const windowMs = 10 * 60 * 1000;
    const maxRequests = 5;

    const record = rateLimitMap.get(clientIp);
    if (!record) {
      rateLimitMap.set(clientIp, { count: 1, firstAttempt: now });
      return { allowed: true };
    }

    if (now - record.firstAttempt > windowMs) {
      rateLimitMap.set(clientIp, { count: 1, firstAttempt: now });
      return { allowed: true };
    }

    if (record.count >= maxRequests) {
      return { allowed: false, remainingMs: windowMs - (now - record.firstAttempt) };
    }

    record.count += 1;
    return { allowed: true };
  },

  // Save new contact message
  addMessage(data: { name: string; email: string; subject: string; message: string; ip?: string }): ContactMessage {
    const ipHash = data.ip
      ? crypto.createHash('sha256').update(data.ip).digest('hex').substring(0, 10)
      : undefined;

    const newMessage: ContactMessage = {
      id: 'msg_' + crypto.randomUUID(),
      name: data.name.trim(),
      email: data.email.trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
      ipHash,
    };

    messages.unshift(newMessage);
    saveToDisk();
    return newMessage;
  },

  // Get all messages for admin
  getAllMessages(): ContactMessage[] {
    return [...messages].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  // Mark message as read/unread
  toggleRead(id: string, readStatus?: boolean): ContactMessage | null {
    const msg = messages.find((m) => m.id === id);
    if (!msg) return null;
    msg.read = readStatus !== undefined ? readStatus : !msg.read;
    saveToDisk();
    return msg;
  },

  // Delete message
  deleteMessage(id: string): boolean {
    const index = messages.findIndex((m) => m.id === id);
    if (index === -1) return false;
    messages.splice(index, 1);
    saveToDisk();
    return true;
  },

  // Admin authentication
  validatePasscode(passcode: string): { success: boolean; token?: string } {
    if (passcode === ADMIN_PASSCODE) {
      const token = 'ds_token_' + crypto.randomBytes(24).toString('hex');
      validAdminSessions.add(token);
      return { success: true, token };
    }
    return { success: false };
  },

  verifyToken(token?: string): boolean {
    if (!token) return false;
    const cleanToken = token.replace('Bearer ', '').trim();
    return validAdminSessions.has(cleanToken);
  },
};
