﻿# connect-sync-backEnd
Welcome to the backend code repository for the Social Media application. This application provides the server-side functionality for a social media platform, including user authentication, post creation, commenting, liking, and more.

User authentication and authorization
CRUD operations for posts
Commenting and liking functionality
Real-time notifications
Video chat integration using WebRTC
User blocking and management
Image upload and handling
Optimized for performance and scalability

Technologies:
Node.js
Express.js
MongoDB
Firebase
WebRTC
JWT (JSON Web Tokens)
AWS S3 for file storage

git clone https://github.com/anand-m-s/CONNECT_SYNC.git
cd /backend
Install dependencies:
npm install
Set up environment variables:

Create a .env file in the root directory and add the following variables:
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
FIREBASE_API_KEY=your-firebase-api-key
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key

Start the server:
npm run dev
