'use client';

import React, { useState } from 'react';
import Hero from '../components/landing/Hero';
import PopularProvinces from '../components/landing/PopularProvinces';
import FeaturedMotorcycles from '../components/landing/FeaturedMotorcycles';
import HowItWorks from '../components/landing/HowItWorks';
import MapPreview from '../components/landing/MapPreview';
import WhyChooseUs from '../components/landing/WhyChooseUs';
import AIAssistantSection from '../components/landing/AIAssistantSection';
import OwnerCTA from '../components/landing/OwnerCTA';
import CustomerReviews from '../components/landing/CustomerReviews';
import FAQAccordion from '../components/landing/FAQAccordion';
import FinalCTA from '../components/landing/FinalCTA';
import BookingModal from '../components/common/BookingModal';
import { LandingMotorcycle } from '../data/landing';
import { Motorcycle } from '../types';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [selectedMotorcycle, setSelectedMotorcycle] = useState<Motorcycle | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookNow = (bike: LandingMotorcycle) => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/motorcycles/${bike.id}`);
      return;
    }

    // Convert LandingMotorcycle to full Motorcycle model for BookingModal
    const fullBike: Motorcycle = {
      id: bike.id,
      owner_id: 1,
      owner_name: 'Verified Host',
      owner_phone: '+855 23 999 888',
      owner_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      owner_verified: true,
      title: bike.name,
      brand: bike.name.split(' ')[0] || 'Honda',
      model: bike.name,
      year: 2024,
      type: (bike.category === 'semi-auto' ? 'manual' : bike.category) as Motorcycle['type'],
      engine_capacity: parseInt(bike.engine) || 125,
      transmission: bike.category === 'semi-auto' 
        ? 'semi-automatic' 
        : bike.transmission.toLowerCase().includes('manual') 
          ? 'manual' 
          : 'automatic',
      fuel_type: 'gasoline',
      daily_price: bike.pricePerDay,
      deposit_amount: 50,
      province_id: 1,
      province_name: bike.province,
      address: bike.pickupLocation,
      latitude: 11.5564,
      longitude: 104.9282,
      description: 'Reliable verified motorcycle with full maintenance and 2 clean helmets included.',
      features: ['2 Clean Helmets Included', 'Full Fuel Tank Option', '24/7 Roadside Assist'],
      images: [bike.image],
      rating: bike.rating,
      review_count: bike.reviewCount,
      is_available: true,
      status: 'active',
      created_at: '2025-01-01'
    };

    setSelectedMotorcycle(fullBike);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="space-y-4 pb-12 selection:bg-[#4A74A7] selection:text-white">
      
      {/* 2. Hero Section (includes SearchBox & Trust Metrics) */}
      <Hero />

      {/* 3. Popular Provinces / Destinations */}
      <PopularProvinces />

      {/* 4. Featured Motorcycles Fleet */}
      <FeaturedMotorcycles onBookNow={handleBookNow} />

      {/* 5. How It Works (4 steps) */}
      <HowItWorks />

      {/* 6. Interactive Map Preview (marked for Google Maps JS API) */}
      <MapPreview />

      {/* 7. Why Choose Motho Rent (6 feature cards) */}
      <WhyChooseUs />

      {/* 8. AI Assistant Highlight & Mock Conversation */}
      <AIAssistantSection />

      {/* 9. Become an Owner (CTA) */}
      <OwnerCTA />

      {/* 10. Customer Reviews */}
      <CustomerReviews />

      {/* 11. FAQ Accordion */}
      <FAQAccordion />

      {/* 12. Final CTA Banner */}
      <FinalCTA />

      {/* Shared Booking Modal */}
      <BookingModal
        motorcycle={selectedMotorcycle}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

    </div>
  );
}
