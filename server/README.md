# Civil Servants Club TKMCE - Backend Server

This is the backend server for the Civil Servants Club TKMCE website, built with Node.js and Express.

## Features

- RESTful API endpoints
- User registration system
- Contact form handling
- Newsletter subscription
- CORS enabled for frontend integration
- Security middleware with Helmet
- Request logging with Morgan
- Input validation and sanitization

## API Endpoints

### Base URL
```
http://localhost:5000
```

### Available Endpoints

#### 1. Health Check
- **GET** `/health`
- Returns server status and uptime

#### 2. User Registration
- **POST** `/api/signup`
- Body:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "course": "Computer Science",
    "year": "3rd Year",
    "interests": "Optional field"
  }
  ```

#### 3. Contact Form
- **POST** `/api/contact`
- Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Your message here"
  }
  ```

#### 4. Newsletter Subscription
- **POST** `/api/newsletter`
- Body:
  ```json
  {
    "email": "john@example.com"
  }
  ```

## Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. For production:
   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## Project Structure

```
server/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
├── .env              # Environment variables (create this)
└── README.md         # This file
```

## Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configured for specific origins
- **Input Validation**: Email and phone number validation
- **Rate Limiting**: Can be added for production use

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- JWT-based authentication
- Email service integration
- File upload handling
- Admin dashboard APIs
- Event management endpoints
- User profile management

## Development

The server uses nodemon for development, which automatically restarts the server when files change.

```bash
npm run dev
```

## Production Deployment

For production deployment, consider:

1. Setting up a proper database
2. Implementing authentication
3. Adding rate limiting
4. Setting up logging
5. Configuring SSL/HTTPS
6. Environment-specific configurations

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Write clear commit messages
5. Test endpoints before submitting