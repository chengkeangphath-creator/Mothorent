export type UserRole = 'customer' | 'owner' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  is_verified?: boolean;
  id_card_verified?: boolean;
  driver_license_verified?: boolean;
  business_name?: string;
  created_at: string;
}

export interface Province {
  id: number;
  name: string;
  name_kh: string;
  code: string;
  image_url: string;
  motorcycle_count: number;
  latitude: number;
  longitude: number;
  popular_attractions: string[];
}

export type MotorcycleType = 'scooter' | 'manual' | 'automatic' | 'dirt_bike' | 'sport' | 'touring';
export type TransmissionType = 'automatic' | 'semi-automatic' | 'manual';
export type FuelType = 'gasoline' | 'electric';
export type MotorcycleStatus = 'active' | 'maintenance' | 'inactive';

export interface Motorcycle {
  id: number;
  owner_id: number;
  owner_name: string;
  owner_phone: string;
  owner_avatar: string;
  owner_verified: boolean;
  title: string;
  brand: string;
  model: string;
  year: number;
  type: MotorcycleType;
  engine_capacity: number; // in cc
  transmission: TransmissionType;
  fuel_type: FuelType;
  fuel_consumption?: string; // e.g. "45 km/L"
  daily_price: number; // in USD
  weekly_price?: number;
  monthly_price?: number;
  deposit_amount: number;
  province_id: number;
  province_name: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  features: string[];
  images: string[];
  rating: number;
  review_count: number;
  is_available: boolean;
  status: MotorcycleStatus;
  created_at: string;
}

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed';
export type PaymentStatus = 'unpaid' | 'pending' | 'paid' | 'refunded';

export interface Booking {
  id: number;
  booking_code: string;
  motorcycle_id: number;
  motorcycle?: Motorcycle;
  customer_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  owner_id: number;
  owner_name: string;
  owner_phone: string;
  start_date: string;
  end_date: string;
  total_days: number;
  daily_price: number;
  total_price: number;
  deposit_amount: number;
  status: BookingStatus;
  payment_status: PaymentStatus;
  pickup_address: string;
  pickup_latitude: number;
  pickup_longitude: number;
  notes?: string;
  cancellation_reason?: string;
  created_at: string;
}

export interface Review {
  id: number;
  motorcycle_id: number;
  user_id: number;
  user_name: string;
  user_avatar?: string;
  user_country?: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface NotificationItem {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: 'booking' | 'system' | 'payment';
  is_read: boolean;
  link?: string;
  created_at: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedMotorcycles?: Motorcycle[];
  suggestedProvinces?: string[];
}

export interface FilterOptions {
  province?: string;
  type?: string;
  brand?: string;
  transmission?: string;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'popular' | 'distance';
  lat?: number;
  lng?: number;
}
