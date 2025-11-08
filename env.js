# .env - Environment Configuration File
# Copy this to .env and fill in your actual values

# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=police_analytics

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CCTNS API Configuration
CCTNS_BASE_URL=https://cctns.gov.in/api/v1
CCTNS_API_KEY=your-cctns-api-key-here
CCTNS_CLIENT_ID=your-client-id
CCTNS_CLIENT_SECRET=your-client-secret

# CCTNS OAuth (if required)
CCTNS_OAUTH_URL=https://cctns.gov.in/oauth/token
CCTNS_SCOPE=read write

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-email-password

# Redis Configuration (optional, for caching)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# Session Configuration
SESSION_SECRET=your-session-secret-key

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log
