import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import logger from './utils/logger';

// Import routes (will be created in later weeks)
// import authRoutes from './routes/auth.routes';
// import userRoutes from './routes/user.routes';

// Load environment variables
dotenv.config();

// Initialize Prisma Client
export const prisma = new PrismaClient();

// Create Express app
const app: Application = express();

// Port configuration
const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1';

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8081',
  credentials: true,
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // HTTP request logger

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Plant Sitter API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API versioned routes
const apiRouter = express.Router();

// Mount routes here (will add in Week 2-3)
// apiRouter.use('/auth', authRoutes);
// apiRouter.use('/users', userRoutes);

// Welcome endpoint
apiRouter.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Plant Sitter API',
    version: API_VERSION,
    documentation: '/api-docs', // Will add Swagger later
  });
});

app.use(`/api/${API_VERSION}`, apiRouter);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('SIGINT signal received: closing HTTP server');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server is running on port ${PORT}`);
  logger.info(`📝 Environment: ${process.env.NODE_ENV}`);
  logger.info(`🔗 API endpoint: http://localhost:${PORT}/api/${API_VERSION}`);
  logger.info(`❤️  Health check: http://localhost:${PORT}/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Promise Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

export default app;
