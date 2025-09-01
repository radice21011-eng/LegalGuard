# Overview

This is a full-stack React application built with Express.js backend showcasing the "Moldova Nouă Master Blueprint 2025" - a comprehensive development vision for the Banat region of Romania. The project presents an integrated approach to regional development covering industrial manufacturing (EV factories), tourism infrastructure, children's entertainment facilities, transportation networks, robotics integration, and economic projections. The application features a modern dark-themed UI with detailed project information, interactive maps, legal compliance, and contact functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client uses a modern React stack with TypeScript, built using Vite for fast development and optimized builds. The architecture follows a component-based design with:

- **UI Framework**: Radix UI components with Tailwind CSS for styling using the "new-york" style from shadcn/ui
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom CSS variables for theming, supporting both dark and light modes
- **Type Safety**: Full TypeScript implementation across all components and utilities

## Backend Architecture
The server uses Express.js with TypeScript in ESM module format, providing a RESTful API structure:

- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Session Management**: PostgreSQL-based session storage using connect-pg-simple
- **API Design**: RESTful endpoints for projects, legal documents, GDPR requests, and copyright violations
- **Middleware Stack**: Custom security, copyright protection, and GDPR compliance middleware

## Data Storage Solutions
The application uses PostgreSQL as the primary database with Drizzle ORM providing the data access layer:

- **Schema Design**: Comprehensive schema including users, projects, legal documents, audit logs, GDPR requests, and copyright violations
- **Migration System**: Drizzle Kit for database migrations and schema management
- **Connection Pool**: Neon serverless PostgreSQL with connection pooling

## Authentication and Authorization
The system implements a multi-layered security approach:

- **Copyright Protection**: Automatic detection and reporting of content tampering or unauthorized use
- **GDPR Compliance**: Built-in consent management and audit logging for EU data protection requirements
- **Security Headers**: Comprehensive HTTP security headers including CSP, XSS protection, and frame options
- **Rate Limiting**: Basic request throttling to prevent abuse

## External Dependencies

- **Database**: Neon serverless PostgreSQL for production data storage
- **Fonts**: Google Fonts integration (Inter and Space Grotesk)
- **Icons**: Font Awesome for comprehensive icon coverage
- **Images**: Unsplash API for high-quality landscape and architectural images
- **Development Tools**: Replit integration with runtime error modal and cartographer for enhanced development experience
- **CSS Framework**: Tailwind CSS via CDN for rapid styling
- **UI Components**: Extensive Radix UI component library for accessible, customizable interface elements

The application emphasizes legal compliance with built-in copyright protection, NDA enforcement, and GDPR adherence, making it suitable for professional presentation of intellectual property and business concepts.