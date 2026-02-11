import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']); // Use Google & Cloudflare DNS for SRV lookups

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;
const host = '0.0.0.0';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === 'production') {
  // Build directory copied into the image by Docker multi-stage build
  const frontendBuildPath = path.resolve(__dirname, '../frontend/build');

  app.use('/uploads', express.static('/var/data/uploads'));
  // Serve compiled React assets (e.g. /static/js/main.js)
  app.use(express.static(frontendBuildPath));

  // For React Router: any non-API GET route should return index.html
  app.get(/^\/(?!api).*/, (req, res) =>
    res.sendFile(path.join(frontendBuildPath, 'index.html'))
  );
} else {
  app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, host, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://${host}:${port}`
  )
);
