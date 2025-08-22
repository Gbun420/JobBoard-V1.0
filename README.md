# JobBoard-V1.0

A modern job board platform built with cutting-edge web technologies.

## Features
- Job listings with detailed descriptions
- Advanced search and filtering capabilities
- Employer and job seeker profiles
- Application tracking system
- Responsive design for all devices

## Tech Stack
- Frontend: React.js with TypeScript
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT
- Deployment: Docker and Kubernetes

## Getting Started
1. Clone the repository
2. Install dependencies with `npm install`
3. Configure environment variables (copy .env.example to .env and fill in values)
4. Run the development server with `npm run dev`

## Deployment
### Vercel Deployment
1. Push your code to a GitHub repository
2. Sign up/log in to Vercel
3. Import your repository
4. Configure environment variables in Vercel dashboard:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret key
   - `COOKIE_SECRET` - Your cookie secret for CSRF protection
5. Deploy!

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
COOKIE_SECRET=your_cookie_secret
PORT=3000
```

### Manual Deployment
1. Build the project with `npm run build`
2. Start the server with `npm start`

## API Endpoints
- `GET /api/jobs` - Get all job listings
- `GET /api/jobs/:id` - Get a specific job by ID
- `POST /api/jobs` - Create a new job listing
- `PUT /api/jobs/:id` - Update a job listing
- `DELETE /api/jobs/:id` - Delete a job listing
- `GET /api/csrf/token` - Get CSRF token for forms
- `GET /health` - Health check endpoint

## Troubleshooting
If you encounter a 500 Internal Server Error:
1. Check that all required environment variables are set
2. Verify your MongoDB connection string is correct
3. Check Vercel logs for specific error messages
4. Ensure your MongoDB database is accessible from Vercel

## Contributing
Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.