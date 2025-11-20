# Image Processor API

## Description
This project is a backend system for an image processing service that provides comprehensive image management capabilities. Users can upload images, perform various transformations (resize, crop, rotate, filters, format conversion), and efficiently retrieve processed images. The service features JWT-based authentication, flexible storage options (local or Cloudinary), and is built with modern TypeScript and NestJS best practices.


 Features

- **User Authentication**: Secure JWT-based authentication system with user registration and login
- **Image Upload**: Support for multiple image formats with local or Cloudinary storage
- **Image Transformations**:
  - Resize images with custom dimensions
  - Crop images with precise coordinates
  - Rotate images by any angle
  - Apply filters (grayscale, sepia)
  - Convert between formats (PNG, JPEG, WEBP, GIF, JP2, TIFF, AVIF)
- **Image Management**: List, fetch, and manage user-specific images
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Flexible Storage**: Choose between local file storage or Cloudinary integration

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) v11
- **Language**: TypeScript
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Image Processing**: [Sharp](https://sharp.pixelplumbing.com/)
- **Cloud Storage**: [Cloudinary](https://cloudinary.com/)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: class-validator & class-transformer
- **API Documentation**: Swagger/OpenAPI
- **Password Hashing**: bcrypt

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- (Optional) Cloudinary account for cloud storage

## 🚀 Installation

1. Clone the repository:
```image_processor_api/README.md#L1-3
git clone <repository-url>
cd image_processor_api
```

2. Install dependencies:
```image_processor_api/README.md#L1-2
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory with the following variables:

```image_processor_api/.env.example#L1-10
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/image_processor_db"

# JWT Secret
JWT_SECRET="your-secret-key-here"

# File Storage (local or s3)
FILE_STORAGE="local"  # or "s3" for Cloudinary

# Cloudinary Configuration (required if FILE_STORAGE=s3)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Server Port
PORT=3000
```

4. Set up the database:
```image_processor_api/README.md#L1-5
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

## 🏃 Running the Application

```image_processor_api/README.md#L1-9
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

The API will be available at `http://localhost:3000/api/v1`

## 📚 API Documentation

Once the application is running, access the interactive Swagger documentation at:

```image_processor_api/README.md#L1-1
http://localhost:3000/api/docs
```

## 🔑 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and receive JWT token

### Images
- `GET /api/v1/images` - Get all images for authenticated user
- `POST /api/v1/images` - Upload a new image
- `POST /api/v1/images/:id/transform` - Transform an image

### Example: Image Transformation

```image_processor_api/README.md#L1-24
POST /api/v1/images/1/transform
Content-Type: application/json
Authorization: Bearer <your-jwt-token>

{
  "transformations": {
    "resize": {
      "width": 800,
      "height": 600
    },
    "crop": {
      "width": 400,
      "height": 400,
      "x": 0,
      "y": 0
    },
    "rotate": 90,
    "format": "webp",
    "filters": {
      "grayscale": true
    }
  }
}
```

## 📁 Project Structure

```image_processor_api/README.md#L1-18
src/
├── authentication/       # Authentication module (JWT, login, register)
├── cloudinary-manager/   # Cloudinary integration service
├── database/            # Database service (Prisma)
├── helpers/             # Utility functions and constants
├── image-manager/       # Image upload and transformation logic
├── user/                # User management module
├── app.module.ts        # Root application module
└── main.ts              # Application entry point

prisma/
└── schema.prisma        # Database schema

upload/                  # Local file storage directory
transformed/             # Transformed images directory
```

## 🧪 Testing

```image_processor_api/README.md#L1-11
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🎨 Supported Image Formats

- PNG
- JPEG
- WEBP
- GIF
- JP2
- TIFF
- AVIF

## 🔐 Security Features

- Password hashing with bcrypt
- JWT-based authentication with expiration
- Protected routes with authentication guards
- Input validation with class-validator
- SQL injection protection with Prisma


## 📖 Project Origin

This project is based on the [Image Processing Service challenge](https://roadmap.sh/projects/image-processing-service) from [roadmap.sh](https://roadmap.sh), a platform providing hands-on project ideas for developers to practice and improve their skills.
