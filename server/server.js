const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Civil Servants Club TKMCE API Server',
    version: '1.0.0',
    status: 'active'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { fullName, email, phone, course, year, interests } = req.body;
    
    // Validate required fields
    if (!fullName || !email || !phone || !course || !year) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format'
      });
    }
    
    // Simulate database save (replace with actual database logic)
    const userData = {
      id: Date.now().toString(),
      fullName,
      email,
      phone,
      course,
      year,
      interests: interests || '',
      registeredAt: new Date().toISOString(),
      status: 'active'
    };
    
    // Log the registration (in production, save to database)
    console.log('New user registration:', userData);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        id: userData.id,
        fullName: userData.fullName,
        email: userData.email,
        registeredAt: userData.registeredAt
      }
    });
    
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Simulate saving contact message
    const contactData = {
      id: Date.now().toString(),
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };
    
    console.log('New contact message:', contactData);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Newsletter subscription endpoint
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Simulate newsletter subscription
    const subscriptionData = {
      id: Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString(),
      status: 'active'
    };
    
    console.log('New newsletter subscription:', subscriptionData);
    
    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter'
    });
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
});

module.exports = app;