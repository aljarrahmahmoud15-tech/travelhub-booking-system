const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const whatsappService = require('./services/whatsappService');
const bookingRoutes = require('./routes/bookingRoutes');
const customerRoutes = require('./routes/customerRoutes');
const settlementRoutes = require('./routes/settlementRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'TravelHub',
    message: 'النظام يعمل بنجاح'
  });
});

app.use('/api/bookings', bookingRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/settlements', settlementRoutes);

app.get('/', (req, res) => {
  res.json({
    name: 'TravelHub',
    version: '1.0.0',
    status: 'running',
    description: 'نظام إدارة حجوزات النقل والأمانات عبر واتساب'
  });
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'حدث خطأ في الخادم'
  });
});

const startServer = async () => {
  await connectDB();
  await whatsappService.initialize();

  app.listen(PORT, () => {
    console.log(`🚀 TravelHub server running on http://localhost:${PORT}`);
    console.log('📱 WhatsApp client initialized');
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

module.exports = app;
