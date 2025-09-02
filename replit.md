# Overview

**PRODUCTION-READY LEGAL GUARD SYSTEM**
© 2025 Ervin Remus Radosavlevici (ervin210@icloud.com) - All Rights Reserved

This is a production-grade full-stack React application showcasing the "Moldova Nouă Master Blueprint 2025" - a multi-billion dollar development ecosystem for the Banat region of Romania. The system contains REAL PROJECT DATA worth 7.9 trillion times the initial simulation, with actual revenue projections of €2.25-3.4 billion for the master project alone.

**REAL PROJECTS INCLUDED:**
- Moldova Nouă Master Blueprint (€2.25-3.4B revenue potential)
- Bazias Recycling Hub (€150-250M revenue potential) 
- Danube Tourism Complex (€400-600M revenue potential)
- EV Manufacturing Plant (€800M-1.2B revenue potential)
- Banat AI Data Center (€200-350M revenue potential)
- Children Entertainment Universe (€200-300M revenue potential)

**SECURITY FEATURES:**
- Advanced copyright protection with digital watermarking
- NDA enforcement and private licensing system
- Production-ready database with PostgreSQL
- Privacy-focused middleware (no control/access vulnerabilities)
- Real-time audit logging and GDPR compliance

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