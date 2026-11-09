import axios from 'axios';
import { MOCK_MOTORCYCLES, CAMBODIA_PROVINCES, MOCK_BOOKINGS, MOCK_REVIEWS, MOCK_NOTIFICATIONS, MOCK_USERS } from '../data/mockData';
import { Motorcycle, Booking, Review, User, Province, NotificationItem, FilterOptions } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 8000,
});

// Attach Sanctum Bearer token if present
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('motho_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Helper for local mock storage
function getLocalItem<T>(key: string, defaultVal: T): T {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setLocalItem<T>(key: string, val: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Local storage write error', e);
  }
}

// ==================== API SERVICES ====================

export const motorcycleService = {
  async getAll(filters?: FilterOptions): Promise<Motorcycle[]> {
    try {
      const response = await apiClient.get('/motorcycles', { params: filters });
      return response.data.data;
    } catch {
      // Fallback to mock data with client filtering
      let list = getLocalItem<Motorcycle[]>('motho_motorcycles', MOCK_MOTORCYCLES);

      if (filters?.province) {
        list = list.filter(m => m.province_name.toLowerCase().includes(filters.province!.toLowerCase()));
      }
      if (filters?.type && filters.type !== 'all') {
        list = list.filter(m => m.type === filters.type);
      }
      if (filters?.brand && filters.brand !== 'all') {
        list = list.filter(m => m.brand.toLowerCase() === filters.brand!.toLowerCase());
      }
      if (filters?.transmission && filters.transmission !== 'all') {
        list = list.filter(m => m.transmission === filters.transmission);
      }
      if (filters?.minPrice) {
        list = list.filter(m => m.daily_price >= filters.minPrice!);
      }
      if (filters?.maxPrice) {
        list = list.filter(m => m.daily_price <= filters.maxPrice!);
      }
      if (filters?.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        list = list.filter(m => 
          m.title.toLowerCase().includes(q) || 
          m.brand.toLowerCase().includes(q) || 
          m.province_name.toLowerCase().includes(q) ||
          m.address.toLowerCase().includes(q)
        );
      }
      if (filters?.sortBy === 'price_asc') {
        list = [...list].sort((a, b) => a.daily_price - b.daily_price);
      } else if (filters?.sortBy === 'price_desc') {
        list = [...list].sort((a, b) => b.daily_price - a.daily_price);
      } else if (filters?.sortBy === 'rating') {
        list = [...list].sort((a, b) => b.rating - a.rating);
      }

      return list;
    }
  },

  async getById(id: number): Promise<Motorcycle | null> {
    try {
      const response = await apiClient.get(`/motorcycles/${id}`);
      return response.data.data;
    } catch {
      const list = getLocalItem<Motorcycle[]>('motho_motorcycles', MOCK_MOTORCYCLES);
      return list.find(m => m.id === Number(id)) || null;
    }
  },

  async create(data: Partial<Motorcycle>): Promise<Motorcycle> {
    try {
      const response = await apiClient.post('/motorcycles', data);
      return response.data.data;
    } catch {
      const list = getLocalItem<Motorcycle[]>('motho_motorcycles', MOCK_MOTORCYCLES);
      const newBike: Motorcycle = {
        id: Date.now(),
        owner_id: data.owner_id || 2,
        owner_name: data.owner_name || "Sophea Chan",
        owner_phone: data.owner_phone || "+855 98 765 432",
        owner_avatar: data.owner_avatar || "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
        owner_verified: true,
        title: data.title || "New Motorcycle",
        brand: data.brand || "Honda",
        model: data.model || "Scoopy",
        year: data.year || 2024,
        type: data.type || "scooter",
        engine_capacity: data.engine_capacity || 125,
        transmission: data.transmission || "automatic",
        fuel_type: data.fuel_type || "gasoline",
        daily_price: data.daily_price || 12,
        deposit_amount: data.deposit_amount || 50,
        province_id: data.province_id || 1,
        province_name: data.province_name || "Phnom Penh",
        address: data.address || "Street 278, BKK1, Phnom Penh",
        latitude: data.latitude || 11.5512,
        longitude: data.longitude || 104.9221,
        description: data.description || "Reliable motorcycle in top condition.",
        features: data.features || ["2 Helmets", "Phone Mount"],
        images: data.images && data.images.length > 0 ? data.images : [
          "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80"
        ],
        rating: 5.0,
        review_count: 0,
        is_available: true,
        status: "active",
        created_at: new Date().toISOString()
      };
      const updated = [newBike, ...list];
      setLocalItem('motho_motorcycles', updated);
      return newBike;
    }
  },

  async update(id: number, data: Partial<Motorcycle>): Promise<Motorcycle> {
    try {
      const response = await apiClient.put(`/motorcycles/${id}`, data);
      return response.data.data;
    } catch {
      const list = getLocalItem<Motorcycle[]>('motho_motorcycles', MOCK_MOTORCYCLES);
      const index = list.findIndex(m => m.id === Number(id));
      if (index === -1) throw new Error("Motorcycle not found");
      const updatedBike = { ...list[index], ...data };
      list[index] = updatedBike;
      setLocalItem('motho_motorcycles', list);
      return updatedBike;
    }
  },

  async delete(id: number): Promise<boolean> {
    try {
      await apiClient.delete(`/motorcycles/${id}`);
      return true;
    } catch {
      const list = getLocalItem<Motorcycle[]>('motho_motorcycles', MOCK_MOTORCYCLES);
      const filtered = list.filter(m => m.id !== Number(id));
      setLocalItem('motho_motorcycles', filtered);
      return true;
    }
  }
};

export const bookingService = {
  async getAll(userRole?: string): Promise<Booking[]> {
    try {
      const response = await apiClient.get('/bookings');
      return response.data.data;
    } catch {
      const bookings = getLocalItem<Booking[]>('motho_bookings', MOCK_BOOKINGS);
      return bookings;
    }
  },

  async getById(id: number): Promise<Booking | null> {
    try {
      const response = await apiClient.get(`/bookings/${id}`);
      return response.data.data;
    } catch {
      const bookings = getLocalItem<Booking[]>('motho_bookings', MOCK_BOOKINGS);
      return bookings.find(b => b.id === Number(id)) || null;
    }
  },

  async create(data: {
    motorcycle_id: number;
    start_date: string;
    end_date: string;
    notes?: string;
  }): Promise<Booking> {
    try {
      const response = await apiClient.post('/bookings', data);
      return response.data.data;
    } catch {
      const bikes = getLocalItem<Motorcycle[]>('motho_motorcycles', MOCK_MOTORCYCLES);
      const bike = bikes.find(b => b.id === Number(data.motorcycle_id)) || MOCK_MOTORCYCLES[0];
      
      const start = new Date(data.start_date);
      const end = new Date(data.end_date);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      const totalPrice = diffDays * bike.daily_price;

      const newBooking: Booking = {
        id: Date.now(),
        booking_code: `MTR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        motorcycle_id: bike.id,
        motorcycle: bike,
        customer_id: 1,
        customer_name: "Alex Johnson",
        customer_email: "customer@motho.com",
        customer_phone: "+855 12 345 678",
        owner_id: bike.owner_id,
        owner_name: bike.owner_name,
        owner_phone: bike.owner_phone,
        start_date: data.start_date,
        end_date: data.end_date,
        total_days: diffDays,
        daily_price: bike.daily_price,
        total_price: totalPrice,
        deposit_amount: bike.deposit_amount,
        status: "pending",
        payment_status: "pending",
        pickup_address: bike.address,
        pickup_latitude: bike.latitude,
        pickup_longitude: bike.longitude,
        notes: data.notes || "",
        created_at: new Date().toISOString()
      };

      const bookings = getLocalItem<Booking[]>('motho_bookings', MOCK_BOOKINGS);
      setLocalItem('motho_bookings', [newBooking, ...bookings]);
      return newBooking;
    }
  },

  async updateStatus(id: number, status: 'approved' | 'rejected' | 'cancelled' | 'completed'): Promise<Booking> {
    try {
      const response = await apiClient.patch(`/bookings/${id}/status`, { status });
      return response.data.data;
    } catch {
      const bookings = getLocalItem<Booking[]>('motho_bookings', MOCK_BOOKINGS);
      const index = bookings.findIndex(b => b.id === Number(id));
      if (index === -1) throw new Error("Booking not found");
      bookings[index].status = status;
      if (status === 'completed') {
        bookings[index].payment_status = 'paid';
      }
      setLocalItem('motho_bookings', bookings);
      return bookings[index];
    }
  }
};

export const provinceService = {
  async getAll(): Promise<Province[]> {
    try {
      const response = await apiClient.get('/provinces');
      return response.data.data;
    } catch {
      return CAMBODIA_PROVINCES;
    }
  }
};

export const reviewService = {
  async getByMotorcycle(motorcycleId: number): Promise<Review[]> {
    try {
      const response = await apiClient.get(`/motorcycles/${motorcycleId}/reviews`);
      return response.data.data;
    } catch {
      const reviews = getLocalItem<Review[]>('motho_reviews', MOCK_REVIEWS);
      return reviews.filter(r => r.motorcycle_id === Number(motorcycleId));
    }
  },

  async create(data: { motorcycle_id: number; rating: number; comment: string }): Promise<Review> {
    try {
      const response = await apiClient.post(`/motorcycles/${data.motorcycle_id}/reviews`, data);
      return response.data.data;
    } catch {
      const reviews = getLocalItem<Review[]>('motho_reviews', MOCK_REVIEWS);
      const newReview: Review = {
        id: Date.now(),
        motorcycle_id: data.motorcycle_id,
        user_id: 1,
        user_name: "Alex Johnson",
        user_country: "Traveler",
        user_avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        rating: data.rating,
        comment: data.comment,
        created_at: new Date().toISOString()
      };
      setLocalItem('motho_reviews', [newReview, ...reviews]);
      return newReview;
    }
  }
};

export const notificationService = {
  async getAll(): Promise<NotificationItem[]> {
    try {
      const response = await apiClient.get('/notifications');
      return response.data.data;
    } catch {
      return getLocalItem<NotificationItem[]>('motho_notifications', MOCK_NOTIFICATIONS);
    }
  },

  async markAsRead(id: number): Promise<void> {
    try {
      await apiClient.post(`/notifications/${id}/read`);
    } catch {
      const list = getLocalItem<NotificationItem[]>('motho_notifications', MOCK_NOTIFICATIONS);
      const updated = list.map(n => n.id === id ? { ...n, is_read: true } : n);
      setLocalItem('motho_notifications', updated);
    }
  }
};

export const aiChatService = {
  async sendMessage(message: string, conversationHistory: { role: string; content: string }[]): Promise<{
    reply: string;
    suggestedMotorcycles?: Motorcycle[];
  }> {
    try {
      const response = await apiClient.post('/ai/chat', { message, history: conversationHistory });
      return response.data;
    } catch {
      // Intelligent client-side AI assistant fallback for travel & bike rentals in Cambodia
      const q = message.toLowerCase();
      const bikes = getLocalItem<Motorcycle[]>('motho_motorcycles', MOCK_MOTORCYCLES);

      if (q.includes('angkor') || q.includes('siem reap')) {
        return {
          reply: "For exploring the Angkor Wat temple complex and Siem Reap, an automatic scooter like the Honda Scoopy 110cc or Click 160cc is ideal! Road conditions in the archeological park are smooth paved asphalt, and parking outside each temple entrance is effortless.",
          suggestedMotorcycles: bikes.filter(b => b.province_name === "Siem Reap")
        };
      }

      if (q.includes('kampot') || q.includes('bokor') || q.includes('dirt') || q.includes('mountain') || q.includes('offroad')) {
        return {
          reply: "For riding up Bokor Mountain or traveling across Kampot's salt fields and pepper farms, we strongly recommend a dual-sport bike like the Honda XR 150L or Royal Enfield Himalayan! The elevation changes and scenic switchbacks are breathtaking.",
          suggestedMotorcycles: bikes.filter(b => b.type === 'dirt_bike' || b.type === 'touring')
        };
      }

      if (q.includes('license') || q.includes('rule') || q.includes('helmet') || q.includes('law')) {
        return {
          reply: "Rental Rules in Cambodia 🇰🇭:\n1. Under Cambodian law, engines up to 125cc generally do not require a Cambodian driver's license for foreigners, though an International Driving Permit (IDP) is recommended.\n2. Wearing a helmet is strictly required by law for both driver and passenger.\n3. Always drive on the right side of the road.\n4. Keep your rental agreement and owner contact on hand.",
        };
      }

      if (q.includes('price') || q.includes('cheap') || q.includes('budget') || q.includes('cost')) {
        return {
          reply: "Our rental prices start as low as $7/day for the legendary Honda Wave 110i, $10-$14/day for modern automatic scooters (Honda Scoopy, Click), and $22-$38/day for adventure tourers. Discounts are available for weekly and monthly bookings!",
          suggestedMotorcycles: bikes.filter(b => b.daily_price <= 12)
        };
      }

      if (q.includes('phnom penh') || q.includes('city')) {
        return {
          reply: "In Phnom Penh, nimble handling and good brakes are key for navigating bustling boulevards. We recommend the Honda Click 160 ABS or Scoopy Prestige.",
          suggestedMotorcycles: bikes.filter(b => b.province_name === "Phnom Penh")
        };
      }

      return {
        reply: "Hello! I am your Motho AI travel and rental companion. I can help you find the best motorcycle for your trip across Cambodia's 25 provinces, explain rental rules, or suggest routes to Angkor Wat, Bokor Mountain, or coastal beaches. Where would you like to travel?",
        suggestedMotorcycles: bikes.slice(0, 3)
      };
    }
  }
};
