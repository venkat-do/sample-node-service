const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Minimal anti-cache middleware - just the critical directive
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    timestampMs: Date.now(),
    uptime: process.uptime(),
    version: '1.0.0',
    requestId: Math.random().toString(36).substring(7)
  });
});

// Root endpoint - with dynamic content to prevent caching
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Sample Node.js Web Service!',
    timestamp: new Date().toISOString(),
    timestampMs: Date.now(),
    random: Math.random(),
    requestId: Math.random().toString(36).substring(7),
    processId: process.pid,
    endpoints: [
      'GET / - This endpoint',
      'GET /health - Health check',
      'GET /api/users - Get users list',
      'GET /api/stats - Get server stats',
      'POST /api/echo - Echo back request data'
    ]
  });
});

// Sample API endpoints
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  res.json(users);
});

app.get('/api/stats', (req, res) => {
  res.json({
    server: 'sample-node-service',
    nodeVersion: process.version,
    platform: process.platform,
    memory: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.post('/api/echo', (req, res) => {
  res.json({
    message: 'Echo response',
    receivedData: req.body,
    headers: req.headers,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong!',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Sample Node.js Web Service running on port ${port}`);
  console.log(`📍 Health check: http://localhost:${port}/health`);
});

module.exports = app;
