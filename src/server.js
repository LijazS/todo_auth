const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const connectDB = require('./config/database');
const buildCorsOptions = require('./config/cors');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();

connectDB(config.mongodbUri);

app.use(cors(buildCorsOptions(config.corsOrigin)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({
    service: 'auth-service',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.json({
    service: 'auth-service',
    endpoints: ['/health', '/api/auth/register', '/api/auth/login'],
  });
});

app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

app.listen(config.port, config.host, () => {
  console.log(`auth-service running on http://${config.host}:${config.port}`);
});
