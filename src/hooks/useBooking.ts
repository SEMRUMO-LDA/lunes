const API_URL = process.env.NEXT_PUBLIC_KIBAN_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_KIBAN_API_KEY;

// ── Types ──────────────────────────────────────────────────────────────

export interface BookingTour {
  slug: string;
  title: string;
  description: string;
  duration: string;
  image: string;
  priceAdult: number;
  priceChild: number;
  childAge: string;
  capacity: number;
}

export interface TimeSlot {
  time: string;
  available: number;
}

export interface AvailabilityResponse {
  date: string;
  tour: string;
  slots: TimeSlot[];
}

export interface CreateBookingPayload {
  tour: string;
  date: string;
  time: string;
  adults: number;
  children: number;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface CreateBookingResponse {
  booking_id: string;
  checkout_url: string;
}

export interface BookingStatus {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  tour: string;
  date: string;
  time: string;
  adults: number;
  children: number;
  total: number;
  name: string;
  email: string;
}

// ── Helper ─────────────────────────────────────────────────────────────

async function bookingFetch(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}/api/v1/bookings${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error?.message || 'Request failed');
  }
  return res.json();
}

// ── API Functions ──────────────────────────────────────────────────────

export async function getTours(): Promise<BookingTour[]> {
  return bookingFetch('/tours');
}

export async function checkAvailability(
  tourSlug: string,
  date: string,
): Promise<AvailabilityResponse> {
  const params = new URLSearchParams({ tour: tourSlug, date });
  return bookingFetch(`/availability?${params.toString()}`);
}

export async function createBooking(
  data: CreateBookingPayload,
): Promise<CreateBookingResponse> {
  return bookingFetch('/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getBookingStatus(
  bookingId: string,
): Promise<BookingStatus> {
  return bookingFetch(`/status/${bookingId}`);
}
