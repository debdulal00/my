
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import { apiRouter } from './server/apiRouter.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    message: 'Portfolio server is running'
  });
});

// API endpoints
app.use('/api', apiRouter);

// Verify production build exists
if (!existsSync(indexPath)) {
  console.error('ERROR: dist/index.html not found!');
  console.error('Expected location:', indexPath);
}

// Serve Vite production build
app.use(express.static(distPath));

// SPA fallback (compatible with Express 4 and 5)
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) {
    return next();
  }

  if (!req.accepts('html')) {
    return next();
  }

  res.sendFile(indexPath, (err) => {
    if (err) next(err);
  });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Portfolio server running on ${HOST}:${PORT}`);
  console.log(`Production build: ${distPath}`);
});
