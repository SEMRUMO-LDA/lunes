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
  total?: number;
  booked?: number;
}

export interface AvailabilityResponse {
  date: string;
  resource: string;
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
  couponCode?: string;
}

export interface CreateBookingResponse {
  booking_id: string;
  checkout_url: string;
  subtotal_cents: number;
  discount_cents: number;
  total_cents: number;
  coupon_applied: string | null;
  demo?: boolean;
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

export interface CouponValidationPayload {
  code: string;
  resourceSlug: string;
  customerEmail: string;
  subtotalCents: number;
  currency?: string;
}

export type CouponValidationResult =
  | { valid: true; code: string; type: string; discountCents: number }
  | { valid: false; reason: string; message: string };

// ── Helper ─────────────────────────────────────────────────────────────

async function apiFetch(path: string, options?: RequestInit, timeoutMs = 3000) {
  if (!API_URL || !API_KEY) throw new Error('Booking API not configured');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${API_URL}/api/v1${path}`, {
      ...options,
      signal: controller.signal,
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
  } finally {
    clearTimeout(timeout);
  }
}

// ── API Functions ──────────────────────────────────────────────────────

export async function getTours(): Promise<BookingTour[]> {
  const body = await apiFetch('/bookings/tours');
  return body?.data ?? body;
}

export async function checkAvailability(
  tourSlug: string,
  date: string,
): Promise<AvailabilityResponse> {
  const params = new URLSearchParams({ date });
  const body = await apiFetch(
    `/bookings/v2/resources/${encodeURIComponent(tourSlug)}/availability?${params.toString()}`,
  );
  return body?.data ?? body;
}

export async function createBooking(
  data: CreateBookingPayload,
): Promise<CreateBookingResponse> {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const body = await apiFetch(
    '/bookings/v2/checkout',
    {
      method: 'POST',
      body: JSON.stringify({
        resource_slug: data.tour,
        date: data.date,
        time_slot: data.time,
        party_size: data.adults,
        party_size_secondary: data.children,
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone,
        notes: data.notes || '',
        coupon_code: data.couponCode || undefined,
        metadata: { source: 'lunes-web' },
        success_url: `${origin}/reservar/confirmacao/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/reservar/?tour=${encodeURIComponent(data.tour)}`,
      }),
    },
    10000,
  );
  return body?.data ?? body;
}

export async function validateCoupon(
  payload: CouponValidationPayload,
): Promise<CouponValidationResult> {
  const body = await apiFetch('/coupons/validate', {
    method: 'POST',
    body: JSON.stringify({
      code: payload.code,
      resource_slug: payload.resourceSlug,
      customer_email: payload.customerEmail,
      subtotal_cents: payload.subtotalCents,
      currency: payload.currency || 'eur',
    }),
  });
  const data = body?.data ?? body;
  if (data?.valid === true) {
    return {
      valid: true,
      code: data.code,
      type: data.type,
      discountCents: data.discount_cents,
    };
  }
  return {
    valid: false,
    reason: data?.reason || 'unknown',
    message: data?.message || 'Código inválido.',
  };
}

export async function getBookingStatus(
  bookingId: string,
): Promise<BookingStatus> {
  const body = await apiFetch(`/bookings/status/${bookingId}`);
  return body?.data ?? body;
}
