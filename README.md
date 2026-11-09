# Motho Rent – Motorcycle Rental Platform in Cambodia 🇰🇭

Motho Rent is a modern, responsive, location-based motorcycle rental platform that connects motorcycle owners with tourists and travelers across all 25 provinces in Cambodia.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Axios, Lucide Icons
- **Backend (Upcoming)**: PHP Laravel, Laravel Sanctum, Eloquent ORM, MySQL, OpenAI API

## Features Implemented in Frontend

### 1. Public Marketplace
- **Home (`/`)**: Hero search, Cambodian provinces showcase, featured fleet by categories, interactive map preview, 3-step rental workflow, owner CTA.
- **Browse Fleet (`/motorcycles`)**: Filter by province, motorcycle category (Scooters, Dirt Bikes, Touring), manufacturer (Honda, Yamaha, etc.), transmission, and price slider.
- **Location & Maps (`/search`)**: Interactive Split View with map and fleet list, location search, and GPS "Use My Location" proximity locator with distance calculation (km).
- **Motorcycle Details (`/motorcycles/[id]`)**: High-res photo gallery, full technical specs table, verified owner card, Google Maps directions, customer reviews, and live booking calculator widget.
- **About Us (`/about`)**: Mission, safety standards, and Cambodia rental FAQs (driving license laws, helmet laws).
- **Contact Us (`/contact`)**: Phnom Penh headquarters contact info, phone, email, and direct inquiry form.
- **Authentication (`/login`, `/register`)**: Login with 1-click test credentials (Customer, Owner, Admin) and dual registration for travelers & bike hosts.

### 2. Customer Dashboard (`/dashboard`)
- **Overview (`/dashboard`)**: Metric cards, active countdown for next upcoming rental, and fast Google Maps directions.
- **My Bookings (`/dashboard/bookings`)**: Categorized by Pending, Approved, Completed, and Cancelled with cancellation actions.
- **Booking Receipt (`/dashboard/bookings/[id]`)**: Printable receipt with financial breakdown, pickup GPS instructions, and host contact.
- **Saved Favorites (`/dashboard/favorites`)**: Bookmarked motorcycles.
- **Notifications (`/dashboard/notifications`)**: Real-time reservation updates.
- **My Reviews (`/dashboard/reviews`)**: Customer submitted ratings.
- **Profile & License (`/dashboard/profile`)**: Manage identity credentials and license verification.

### 3. Motorcycle Owner Dashboard (`/owner`)
- **Fleet Overview (`/owner`)**: Fleet count, pending requests, gross earnings in USD, and fleet utilization rates.
- **Fleet Management (`/owner/motorcycles`)**: Toggle availability (Available / Maintenance) and edit/delete listings.
- **Add Motorcycle (`/owner/motorcycles/add`)**: Complete form with category, cc, pricing, included gear checkboxes, and Google Maps GPS coordinates.
- **Edit Motorcycle (`/owner/motorcycles/[id]/edit`)**: Modify pricing, deposit, and descriptions.
- **Booking Requests (`/owner/bookings`)**: Accept or reject traveler requests, confirm return and completion.
- **Rental History (`/owner/history`)**: Historical rental logs.
- **Earnings & Payouts (`/owner/earnings`)**: Revenue metrics, ABA Bank & Bakong KHQR payout details.
- **Customer Reviews (`/owner/reviews`)**: Feedback on owner's fleet.
- **Owner Profile (`/owner/profile`)**: Business profile and bank details.

### 4. Admin Command Center (`/admin`)
- **Overview (`/admin`)**: Revenue analytics, active fleet count across 25 provinces, recent booking feed.
- **Manage Users (`/admin/users`)**: Search, view, and manage customers and hosts.
- **Owner Approvals (`/admin/owners`)**: Inspect Cambodian identity and business documents, approve or reject hosts.
- **Provinces (`/admin/provinces`)**: 25 Cambodian provinces with Khmer names and GPS coordinates.
- **Fleet Moderation (`/admin/motorcycles`)**: Review and moderate listings.
- **Master Bookings (`/admin/bookings`)**: Override booking and payment statuses.
- **Payments (`/admin/payments`)**: Transaction records, Bakong KHQR verification, deposit refunds.
- **Reviews (`/admin/reviews`)**: Moderate reviews and delete inappropriate content.
- **Analytics (`/admin/analytics`)**: Demand by province and top bike models.
- **AI Management (`/admin/ai`)**: Configure OpenAI model, temperature, and system prompt.

### 5. Interactive Motho AI Assistant
- Floating widget on all pages with bilingual (Khmer ភាសាខ្មែរ & English) assistance.
- Recommends motorcycles based on destination (Angkor Wat, Bokor Mountain, Phnom Penh), budget, and category.

## Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 10+

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

Use the **Role Switcher** in the top navigation bar to seamlessly test the application as **Customer**, **Owner**, or **Administrator**!
