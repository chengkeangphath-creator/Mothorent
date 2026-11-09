# Motho Rent – Full-Stack Motorcycle Rental Platform

Act as a senior full-stack developer and software architect. Help me build a complete, modern, responsive motorcycle rental platform called **Motho Rent**, designed for tourists and travelers in Cambodia.

## 1. Project Overview

Motho Rent is a location-based motorcycle rental platform that connects motorcycle owners with customers.

Customers can:
- Search for motorcycles by Cambodian province.
- Find nearby motorcycles using their current location.
- View motorcycle details, prices, images, ratings, and pickup locations.
- Book motorcycles online.
- Track booking status.
- Communicate with the rental process through an AI chatbot.

Owners can:
- Register and manage their profiles.
- Publish and manage motorcycle listings.
- Set rental prices and availability.
- Set motorcycle pickup locations on Google Maps.
- Accept or reject booking requests.
- View rental history and earnings.

Administrators can manage the entire platform.

## 2. Technology Stack

Use this exact technology stack. Do not replace it with another framework.

### Frontend
- Next.js (React)
- TypeScript
- Tailwind CSS
- JavaScript / TypeScript
- Axios for API requests
- React components for reusable UI
- Google Maps JavaScript API for maps

### Backend
- PHP Laravel
- Laravel RESTful API
- Laravel Sanctum for API authentication
- Laravel Eloquent ORM
- Laravel Form Requests for validation
- Laravel Policies and Middleware for authorization

### Database
- MySQL
- Laravel Migrations
- Eloquent Relationships

### AI Integration
- OpenAI API
- AI requests must go through Laravel backend.
- Never expose API keys in Next.js frontend code.

## 3. System Architecture

Build the application using a separate frontend and backend.

- Next.js handles the user interface and client-side interactions.
- Laravel handles authentication, business logic, validation, authorization, and API endpoints.
- MySQL stores users, motorcycles, bookings, payments, reviews, and other system data.
- Next.js communicates with Laravel through RESTful API endpoints.
- Laravel communicates with MySQL using Eloquent ORM.
- Laravel securely communicates with the OpenAI API.

Use JSON for API request and response data.

Suggested folder structure:

motho-rent/
- frontend/  (Next.js application)
- backend/   (Laravel application)
- README.md

## 4. User Roles

### Customer
- Register and log in.
- Manage profile.
- Search motorcycles by province or current location.
- View motorcycles on Google Maps.
- Filter by price, brand, type, and availability.
- View motorcycle details and owner information.
- Select rental dates.
- Submit booking requests.
- View booking history and status.
- Cancel bookings according to rental rules.
- Submit reviews and ratings.
- Manage favorites and notifications.

### Motorcycle Owner
- Register and log in as an owner.
- Manage owner profile.
- Add, edit, and delete motorcycles.
- Upload motorcycle images.
- Set motorcycle information and daily rental prices.
- Set motorcycle availability.
- Select pickup location using Google Maps.
- Manage incoming booking requests.
- Accept or reject requests.
- View rental history and earnings.
- View customer reviews.

### Administrator
- Manage customers and owners.
- Verify owners.
- Manage provinces.
- Manage motorcycle listings.
- Manage bookings and payments.
- Manage reviews and complaints.
- View reports and statistics.
- Manage AI chatbot configuration.

## 5. Main Pages

### Public Website
- Home
- About Us
- Browse Motorcycles
- Search Results
- Motorcycle Details
- Login
- Register
- Contact Us

### Customer Dashboard
- Dashboard Overview
- My Profile
- My Bookings
- Booking Details
- Favorites
- Notifications
- My Reviews

### Owner Dashboard
- Dashboard Overview
- My Motorcycles
- Add Motorcycle
- Edit Motorcycle
- Booking Requests
- Rental History
- Earnings
- Reviews
- Owner Profile

### Admin Dashboard
- Dashboard Overview
- Manage Users
- Manage Owners
- Manage Provinces
- Manage Motorcycles
- Manage Bookings
- Manage Payments
- Manage Reviews
- Reports and Analytics
- AI Management

## 6. Location and Google Maps

Implement Google Maps integration.

Requirements:
- Display motorcycle pickup locations on an interactive map.
- Allow customers to search by Cambodian province.
- Request browser location permission when customers choose to use their current location.
- Find nearby motorcycles using latitude and longitude.
- Calculate distances between customer location and motorcycle pickup locations.
- Display motorcycle markers.
- Show motorcycle information when a marker is selected.
- Provide Google Maps directions to pickup locations.

Store fixed pickup coordinates in MySQL.

Do not claim that Google Maps automatically tracks moving motorcycles. Real-time GPS tracking requires a GPS device or an authorized smartphone sending location updates.

## 7. Booking System

Implement a complete booking workflow:

1. Customer selects a motorcycle.
2. Customer selects rental start and end dates.
3. Laravel calculates the rental duration and price.
4. Customer submits a booking request.
5. Owner receives a notification.
6. Owner accepts or rejects the request.
7. Customer views booking status.
8. Payment is recorded and verified.
9. Booking is marked completed after the rental ends and the return is confirmed.

Booking statuses:
- Pending
- Approved
- Rejected
- Cancelled
- Completed

Payment statuses:
- Unpaid
- Pending
- Paid
- Refunded

Important:
- Validate availability on the Laravel backend.
- Prevent overlapping confirmed bookings.
- Never trust prices submitted by the frontend.
- Never mark payments as paid without verification.

## 8. AI Features

Integrate AI using Laravel backend services.

### AI Chatbot
- Answer questions about motorcycle rentals.
- Explain rental rules.
- Help customers use the platform.
- Support Khmer and English.
- Help customers find motorcycles.

### AI Motorcycle Recommendation
Recommend motorcycles using:
- Destination
- Budget
- Motorcycle type
- Rental duration
- Availability
- Distance

### AI Travel Assistant
- Suggest Cambodian tourist destinations.
- Provide travel ideas based on the selected province.
- Recommend suitable motorcycle types.

AI must use real inventory and availability data from MySQL through Laravel. It must not invent listings, prices, or booking confirmations.

## 9. Database Design

Create Laravel migrations, models, controllers, relationships, and seeders for these tables:

- users
- provinces
- motorcycles
- motorcycle_images
- motorcycle_locations
- bookings
- payments
- reviews
- notifications
- favorites
- ai_conversations
- ai_messages

Add appropriate:
- Primary keys
- Foreign keys
- Indexes
- Timestamps
- Data types
- Validation rules
- Eloquent relationships

You may recommend additional tables when necessary and explain why they are needed.

## 10. UI/UX Requirements

Create a modern, professional motorcycle rental marketplace.

Design direction:
- Primary colors: dark navy, white, and orange.
- Modern travel marketplace appearance.
- Responsive desktop, tablet, and mobile layouts.
- Clean navigation bar.
- Attractive homepage hero section.
- Motorcycle search section.
- Motorcycle listing cards with photos and prices.
- Ratings and pickup location information.
- Interactive map.
- Clear booking buttons.
- Professional customer, owner, and admin dashboards.
- Consistent typography, spacing, and reusable components.

Use Next.js reusable components and Tailwind CSS.

## 11. Security

Implement:
- Laravel Sanctum authentication.
- Secure login and logout.
- Role-based access control.
- Laravel Policies and Middleware.
- Server-side validation.
- Secure image upload.
- Password hashing.
- CSRF protection where applicable.
- CORS configuration.
- API rate limiting.
- Protection against SQL injection and XSS.
- Secure environment variables.
- Ownership checks for motorcycle and booking resources.

Do not expose Laravel secrets, database credentials, or OpenAI API keys to the browser.

## 12. Development Workflow

Build the project step by step.

### Phase 1: Project Setup
- Create the Next.js frontend.
- Create the Laravel backend.
- Configure MySQL.
- Configure frontend-to-backend API communication.
- Set up environment variables.

### Phase 2: Database Design
- Create migrations.
- Create models and relationships.
- Create seeders and sample data.

### Phase 3: Authentication
- Implement Laravel Sanctum.
- Connect Next.js login and registration forms.
- Implement customer, owner, and admin roles.

### Phase 4: Frontend Development
- Build public pages.
- Build reusable components.
- Build responsive dashboards.

### Phase 5: Motorcycle Management
- Implement motorcycle CRUD APIs.
- Connect Next.js forms to Laravel.
- Implement image uploads.

### Phase 6: Location Search
- Integrate Google Maps.
- Implement province search.
- Implement nearby motorcycle search.

### Phase 7: Booking Management
- Implement booking APIs.
- Implement availability validation.
- Implement owner booking management.
- Implement booking notifications.

### Phase 8: Admin Dashboard
- Implement user, motorcycle, booking, payment, and review management.

### Phase 9: AI Integration
- Integrate OpenAI through Laravel.
- Implement chatbot and recommendation features.

### Phase 10: Testing and Deployment
- Test APIs.
- Test frontend functionality.
- Test authentication and permissions.
- Test booking conflicts.
- Check security.
- Prepare deployment instructions.

## 13. Important Instructions for AI Developer

1. Use Next.js for the frontend and Laravel for the backend.
2. Use MySQL as the database.
3. Keep frontend and backend as separate applications.
4. Use RESTful APIs for communication.
5. Use TypeScript in Next.js.
6. Use clean, maintainable, reusable code.
7. Explain every command and file location.
8. Provide complete code, not just examples or pseudocode.
9. Do not skip configuration steps.
10. Test each feature before moving to the next phase.
11. Do not build all features in one response.
12. If information is missing, ask before making important architectural decisions.

**Start with Phase 1: Project Setup. First explain the architecture, folder structure, prerequisites, and commands for creating the Next.js frontend and Laravel backend.**