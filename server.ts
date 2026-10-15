import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { initialSiteConfig, SiteConfig } from './src/data/siteConfig';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Data storage paths
const DATA_DIR = path.resolve(__dirname, 'data');
const CONFIG_FILE = path.join(DATA_DIR, 'site-config.json');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize config if not existing
if (!fs.existsSync(CONFIG_FILE)) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(initialSiteConfig, null, 2), 'utf8');
}

// Initialize enquiries if not existing
if (!fs.existsSync(ENQUIRIES_FILE)) {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), 'utf8');
}

function getSiteConfig(): SiteConfig {
  try {
    const raw = fs.readFileSync(CONFIG_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return initialSiteConfig;
  }
}

function saveSiteConfig(config: SiteConfig): void {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf8');
}

interface StoredEnquiry {
  id: string;
  name: string;
  businessName?: string;
  phone: string;
  email?: string;
  service: string;
  budgetRange: string;
  description: string;
  referenceLink?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';
  notes?: string;
}

function getEnquiries(): StoredEnquiry[] {
  try {
    const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveEnquiries(enquiries: StoredEnquiry[]): void {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf8');
}

// In-memory active admin sessions: token -> timestamp
const activeAdminTokens = new Set<string>();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'reelspark2026';

// Middleware to authenticate admin requests
function requireAdminAuth(req: Request, res: Response, next: () => void) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid authorization token' });
  }

  const token = authHeader.split(' ')[1];
  if (!token || !activeAdminTokens.has(token)) {
    return res.status(403).json({ error: 'Forbidden: Invalid or expired admin session' });
  }

  next();
}

// --- API ROUTES ---

// 1. Get live site configuration
app.get('/api/config', (_req: Request, res: Response) => {
  const config = getSiteConfig();
  res.json({ success: true, config });
});

// 2. Submit new customer enquiry
app.post('/api/enquiry', (req: Request, res: Response) => {
  const { name, businessName, phone, email, service, budgetRange, description, referenceLink } = req.body;

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Please enter a valid customer name (at least 2 characters).' });
  }

  if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
    return res.status(400).json({ error: 'Please provide a valid WhatsApp phone number.' });
  }

  if (!service || typeof service !== 'string') {
    return res.status(400).json({ error: 'Please select a required service.' });
  }

  if (!description || typeof description !== 'string' || description.trim().length < 5) {
    return res.status(400).json({ error: 'Please provide a brief project description (at least 5 characters).' });
  }

  const newEnquiry: StoredEnquiry = {
    id: `enq_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
    name: name.trim(),
    businessName: businessName?.trim() || undefined,
    phone: phone.trim(),
    email: email?.trim() || undefined,
    service: service.trim(),
    budgetRange: budgetRange?.trim() || 'Flexible / To be discussed',
    description: description.trim(),
    referenceLink: referenceLink?.trim() || undefined,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  const enquiries = getEnquiries();
  enquiries.unshift(newEnquiry);
  saveEnquiries(enquiries);

  // Generate prefilled WhatsApp URL for instant client redirection
  const config = getSiteConfig();
  const whatsappNumber = config.brand.whatsappNumber || '919996375070';
  const whatsappText = `Hello Reel Spark, I have submitted an enquiry:
• Name: ${newEnquiry.name}
${newEnquiry.businessName ? `• Business: ${newEnquiry.businessName}\n` : ''}• Service: ${newEnquiry.service}
• Budget: ${newEnquiry.budgetRange}
• Details: ${newEnquiry.description}
${newEnquiry.referenceLink ? `• Reference: ${newEnquiry.referenceLink}\n` : ''}
Please confirm receipt and share next steps!`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  res.json({
    success: true,
    message: 'Your enquiry has been successfully recorded. Our team will review and connect with you shortly.',
    enquiryId: newEnquiry.id,
    whatsappUrl,
  });
});

// 3. Admin Authentication Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Password is required' });
  }

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid admin credentials' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  activeAdminTokens.add(token);

  res.json({
    success: true,
    token,
    message: 'Authentication successful',
  });
});

// 4. Admin Logout
app.post('/api/admin/logout', requireAdminAuth, (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    activeAdminTokens.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// 5. Admin: Get all enquiries
app.get('/api/admin/enquiries', requireAdminAuth, (_req: Request, res: Response) => {
  const enquiries = getEnquiries();
  res.json({ success: true, enquiries });
});

// 6. Admin: Update enquiry status/notes
app.patch('/api/admin/enquiries/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const enquiries = getEnquiries();
  const index = enquiries.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }

  if (status) enquiries[index].status = status;
  if (notes !== undefined) enquiries[index].notes = notes;

  saveEnquiries(enquiries);
  res.json({ success: true, enquiry: enquiries[index] });
});

// 7. Admin: Update site configuration (prices, services, portfolio, etc.)
app.post('/api/admin/config', requireAdminAuth, (req: Request, res: Response) => {
  const updatedConfig = req.body;

  if (!updatedConfig || typeof updatedConfig !== 'object') {
    return res.status(400).json({ error: 'Invalid configuration payload' });
  }

  saveSiteConfig(updatedConfig);
  res.json({ success: true, message: 'Site configuration updated successfully' });
});

// 8. Admin: Reset config to default
app.post('/api/admin/config/reset', requireAdminAuth, (_req: Request, res: Response) => {
  saveSiteConfig(initialSiteConfig);
  res.json({ success: true, message: 'Configuration reset to default settings' });
});

// Vite / Static file handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Reel Spark server running on port ${PORT} [Mode: ${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
