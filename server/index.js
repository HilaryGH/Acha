const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Trust proxy for accurate IP addresses (if behind reverse proxy)
app.set('trust proxy', 1);

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint (should be before other routes)
app.get('/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const mongoStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  const isHealthy = mongoStatus === 1; // 1 = connected
  
  // Get database connection info
  const mongoURI = process.env.MONGO_URI;
  const dbName = mongoose.connection.name || 'unknown';
  
  // Determine database source
  let dbSource = 'unknown';
  if (mongoURI) {
    // Check if it's a cloud service (MongoDB Atlas, etc.)
    if (mongoURI.includes('mongodb.net') || mongoURI.includes('mongodb+srv')) {
      // Extract hostname from connection string
      const match = mongoURI.match(/mongodb\+?srv?:\/\/([^\/]+)/);
      const hostname = match ? match[1].split('@').pop()?.split('/')[0] : 'cloud';
      dbSource = `cloud (${hostname})`;
    } else if (mongoURI.includes('localhost') || mongoURI.includes('127.0.0.1')) {
      dbSource = 'local (from .env)';
    } else {
      // Extract hostname for other remote connections
      const match = mongoURI.match(/mongodb:\/\/([^\/]+)/);
      const hostname = match ? match[1].split('@').pop()?.split('/')[0] : 'remote';
      dbSource = `remote (${hostname})`;
    }
  }
  
  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'healthy' : 'unhealthy',
    server: 'running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      status: mongoStates[mongoStatus] || 'unknown',
      connected: mongoStatus === 1,
      name: dbName,
      source: dbSource,
      usingEnv: true
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

// Simple status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Routes
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/buyers', require('./routes/buyerRoutes'));
app.use('/api/senders', require('./routes/senderRoutes'));
app.use('/api/receivers', require('./routes/receiverRoutes'));
app.use('/api/travellers', require('./routes/travellerRoutes'));
app.use('/api/partners', require('./routes/partnerRoutes'));
app.use('/api/women-initiatives', require('./routes/womenInitiativeRoutes'));
app.use('/api/premium', require('./routes/premiumRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/audit', require('./routes/auditRoutes'));

// MongoDB connection - REQUIRED from .env file
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('✗ ERROR: MONGO_URI is not set in .env file');
  console.error('  Please set MONGO_URI in your .env file');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    const dbName = mongoose.connection.name;
    console.log(`✓ Connected to MongoDB`);
    console.log(`  Database: ${dbName}`);
    console.log(`  Source: from .env file (MONGO_URI)`);
  })
  .catch((error) => {
    console.error('✗ MongoDB connection error:', error);
    console.error('  Please check your MONGO_URI in .env file');
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
