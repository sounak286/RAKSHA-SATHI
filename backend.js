// server.js - Backend Server with CCTNS API Integration
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'police_analytics',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// CCTNS API Configuration
const CCTNS_CONFIG = {
  baseURL: process.env.CCTNS_BASE_URL || 'https://cctns.gov.in/api/v1',
  apiKey: process.env.CCTNS_API_KEY || 'your-cctns-api-key',
  timeout: 30000
};

// Create axios instance for CCTNS API
const cctnsAPI = axios.create({
  baseURL: CCTNS_CONFIG.baseURL,
  timeout: CCTNS_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': CCTNS_CONFIG.apiKey
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// ==================== AUTH ROUTES ====================

// User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, fullName, badgeNumber, rank, district } = req.body;

    // Validate input
    if (!username || !email || !password || !fullName || !badgeNumber) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user exists
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await pool.query(
      `INSERT INTO users (username, email, password, full_name, badge_number, rank, district, role) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [username, email, hashedPassword, fullName, badgeNumber, rank || 'Officer', district, 'user']
    );

    res.status(201).json({ 
      message: 'User registered successfully',
      userId: result.insertId 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Find user
    const [users] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, username]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username, 
        role: user.role,
        district: user.district 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update last login
    await pool.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        badgeNumber: user.badge_number,
        rank: user.rank,
        district: user.district,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Current User Profile
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, username, email, full_name, badge_number, rank, district, role, created_at, last_login FROM users WHERE id = ?',
      [req.user.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: users[0] });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==================== CCTNS API INTEGRATION ROUTES ====================

// Fetch Overall Statistics from CCTNS
app.get('/api/cctns/statistics', authenticateToken, async (req, res) => {
  try {
    // Call CCTNS API
    const response = await cctnsAPI.get('/statistics/overall', {
      params: {
        state: req.query.state || 'ALL',
        district: req.query.district || 'ALL',
        startDate: req.query.startDate,
        endDate: req.query.endDate
      }
    });

    // Cache in local database
    await pool.query(
      'INSERT INTO cctns_cache (endpoint, data, cached_at) VALUES (?, ?, NOW())',
      ['statistics', JSON.stringify(response.data)]
    );

    res.json(response.data);
  } catch (error) {
    console.error('CCTNS API Error:', error);
    
    // Fallback to cached data
    const [cached] = await pool.query(
      'SELECT data FROM cctns_cache WHERE endpoint = ? ORDER BY cached_at DESC LIMIT 1',
      ['statistics']
    );

    if (cached.length > 0) {
      return res.json(JSON.parse(cached[0].data));
    }

    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Fetch Cases from CCTNS
app.get('/api/cctns/cases', authenticateToken, async (req, res) => {
  try {
    const { status, district, startDate, endDate, limit = 50, offset = 0 } = req.query;

    const response = await cctnsAPI.get('/cases/list', {
      params: { status, district, startDate, endDate, limit, offset }
    });

    res.json(response.data);
  } catch (error) {
    console.error('CCTNS Cases Error:', error);
    res.status(500).json({ error: 'Failed to fetch cases' });
  }
});

// Fetch District Performance from CCTNS
app.get('/api/cctns/district-performance', authenticateToken, async (req, res) => {
  try {
    const response = await cctnsAPI.get('/performance/districts', {
      params: {
        state: req.query.state || 'ALL',
        month: req.query.month,
        year: req.query.year
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('CCTNS District Performance Error:', error);
    res.status(500).json({ error: 'Failed to fetch district performance' });
  }
});

// Fetch Monthly Trends from CCTNS
app.get('/api/cctns/trends', authenticateToken, async (req, res) => {
  try {
    const response = await cctnsAPI.get('/analytics/trends', {
      params: {
        district: req.query.district,
        year: req.query.year || new Date().getFullYear(),
        months: req.query.months || 6
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('CCTNS Trends Error:', error);
    res.status(500).json({ error: 'Failed to fetch trends' });
  }
});

// Fetch Special Drives Data from CCTNS
app.get('/api/cctns/special-drives', authenticateToken, async (req, res) => {
  try {
    const response = await cctnsAPI.get('/operations/special-drives', {
      params: {
        district: req.query.district,
        startDate: req.query.startDate,
        endDate: req.query.endDate
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('CCTNS Special Drives Error:', error);
    res.status(500).json({ error: 'Failed to fetch special drives data' });
  }
});

// Submit Good Work Entry to CCTNS
app.post('/api/cctns/good-work', authenticateToken, async (req, res) => {
  try {
    const { 
      officerName, 
      badgeNumber, 
      district, 
      achievement, 
      category, 
      date,
      description 
    } = req.body;

    // Submit to CCTNS Good Work Portal
    const response = await cctnsAPI.post('/good-work/submit', {
      officerName,
      badgeNumber,
      district,
      achievement,
      category,
      date,
      description,
      submittedBy: req.user.username,
      submittedById: req.user.userId
    });

    // Save to local database
    await pool.query(
      `INSERT INTO good_work_entries (officer_name, badge_number, district, achievement, category, date, description, submitted_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [officerName, badgeNumber, district, achievement, category, date, description, req.user.userId]
    );

    res.json({ 
      message: 'Good work entry submitted successfully',
      data: response.data 
    });
  } catch (error) {
    console.error('CCTNS Good Work Submission Error:', error);
    res.status(500).json({ error: 'Failed to submit good work entry' });
  }
});

// ==================== LOCAL DATABASE ROUTES ====================

// Get Press Releases
app.get('/api/press-releases', authenticateToken, async (req, res) => {
  try {
    const [releases] = await pool.query(
      'SELECT * FROM press_releases ORDER BY date DESC LIMIT 20'
    );
    res.json(releases);
  } catch (error) {
    console.error('Press Releases Error:', error);
    res.status(500).json({ error: 'Failed to fetch press releases' });
  }
});

// Create Press Release (Admin only)
app.post('/api/press-releases', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { title, content, category } = req.body;

    const [result] = await pool.query(
      'INSERT INTO press_releases (title, content, category, date) VALUES (?, ?, ?, NOW())',
      [title, content, category]
    );

    res.status(201).json({ 
      message: 'Press release created successfully',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Create Press Release Error:', error);
    res.status(500).json({ error: 'Failed to create press release' });
  }
});

// Get Crime Alerts
app.get('/api/crime-alerts', authenticateToken, async (req, res) => {
  try {
    const [alerts] = await pool.query(
      'SELECT * FROM crime_alerts WHERE is_active = 1 ORDER BY created_at DESC LIMIT 10'
    );
    res.json(alerts);
  } catch (error) {
    console.error('Crime Alerts Error:', error);
    res.status(500).json({ error: 'Failed to fetch crime alerts' });
  }
});

// ==================== ADMIN ROUTES ====================

// Get All Users (Admin only)
app.get('/api/admin/users', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const [users] = await pool.query(
      'SELECT id, username, email, full_name, badge_number, rank, district, role, created_at, last_login FROM users'
    );

    res.json(users);
  } catch (error) {
    console.error('Get Users Error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update User Role (Admin only)
app.put('/api/admin/users/:id/role', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { role } = req.body;
    const userId = req.params.id;

    await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, userId]);

    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error('Update Role Error:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

// ==================== HEALTH CHECK ====================

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Police Analytics Backend'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Police Analytics Backend Ready`);
});
