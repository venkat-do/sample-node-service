# Sample Node.js Web Service

A simple Express.js web service for benchmarking and testing purposes.

## Features

- Health check endpoint
- REST API endpoints
- JSON responses
- Error handling
- Server statistics

## Endpoints

- `GET /` - Welcome message with endpoint list
- `GET /health` - Health check
- `GET /api/users` - Sample users data
- `GET /api/stats` - Server statistics
- `POST /api/echo` - Echo back request data

## Running Locally

```bash
npm install
npm start
```

The server will start on port 3000 (or PORT environment variable).

## Deployment

This service is designed to work with DigitalOcean App Platform and other cloud providers.
