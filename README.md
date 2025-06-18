# Vicast

A modern video streaming and conferencing platform built with Next.js, featuring real-time communication, AI-powered features, and advanced video processing capabilities.

## Features

- 🎥 **Live Video Streaming** - Real-time video conferencing with LiveKit
- 🤖 **AI Integration** - OpenAI, AssemblyAI, and Deepgram API support
- 📱 **Responsive Design** - Built with Tailwind CSS and Radix UI components
- 🎨 **3D Graphics** - Three.js integration for immersive experiences
- 🔐 **Authentication** - Google OAuth and JWT-based authentication
- 📧 **Email Services** - Nodemailer integration for notifications
- 📊 **Database** - PostgreSQL with Prisma ORM
- ☁️ **Cloud Storage** - AWS S3 and Vercel Blob integration
- 🎬 **Video Processing** - FFmpeg for video manipulation

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **UI Components**: Radix UI, Lucide React
- **Database**: PostgreSQL, Prisma
- **Authentication**: Google OAuth, JWT
- **Real-time**: LiveKit, Socket.io, WebSockets
- **AI/ML**: OpenAI, TensorFlow.js, Transformers
- **Video**: FFmpeg, MediaPipe
- **Cloud**: AWS S3, Vercel Blob
- **State Management**: Zustand

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- AWS account (for S3 storage)
- Google Cloud Console project (for OAuth)
- LiveKit account
- OpenAI API key
- AssemblyAI API key
- Deepgram API key

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd vicast
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   # Database
   DATABASE_URL="your_postgresql_connection_string"
   
   # Authentication
   JWT_SECRET="your_jwt_secret_key"
   
   # Email Configuration
   EMAIL="your_email@gmail.com"
   EMAIL_PASS="your_email_app_password"
   
   # Base URLs
   baseURL="http://localhost:3000"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   
   # Google OAuth
   NEXT_PUBLIC_GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   
   # LiveKit Configuration
   LIVEKIT_URL="your_livekit_server_url"
   LIVEKIT_API_KEY="your_livekit_api_key"
   LIVEKIT_API_SECRET="your_livekit_api_secret"
   NEXT_PUBLIC_LIVEKIT_URL="your_livekit_server_url"
   
   # AWS Configuration
   AWS_ACCESS_KEY_ID="your_aws_access_key"
   AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
   AWS_REGION="your_aws_region"
   AWS_S3_BUCKET_NAME="your_s3_bucket_name"
   
   # AI Service APIs
   NEXT_PUBLIC_OPENAI_API_KEY="your_openai_api_key"
   NEXT_PUBLIC_ASSEMBLYAI_API_KEY="your_assemblyai_api_key"
   NEXT_PUBLIC_DEEPGRAM_API_KEY="your_deepgram_api_key"
   
   # Vercel Blob
   BLOB_READ_WRITE_TOKEN="your_vercel_blob_token"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   ```

## Development

**Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`
   ```

## Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run server` - Start the backend server
- `npm run dev:all` - Run both frontend and backend servers

## Configuration Guide

### Google OAuth Setup
1. Go to Google Cloud Console
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins

### LiveKit Setup
1. Create account at LiveKit
2. Get your API key and secret
3. Configure server URL in environment variables

### AWS S3 Setup
1. Create an S3 bucket
2. Configure IAM user with S3 permissions
3. Add credentials to environment variables

### AI Services Setup
- **OpenAI**: Get API key from OpenAI platform
- **AssemblyAI**: Sign up and get API key
- **Deepgram**: Create account and get API key

## Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### Manual Deployment
1. Build the application
   ```bash
   npm run build
   ```
2. Start production server
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support and questions, please contact the development team or create an issue in the repository.