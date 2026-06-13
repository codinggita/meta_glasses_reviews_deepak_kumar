const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorMiddleware = require('./middlewares/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const statsRoutes = require('./routes/statsRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://meta-glasses-reviews.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later' },
});
app.use('/api/v1', limiter);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to the Meta Glasses Reviews API' });
});

app.get('/api/v1/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/stats', statsRoutes);
app.use('/api/v1/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

app.use(errorMiddleware);

module.exports = app;
