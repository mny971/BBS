export enum ActivityType {
  WAKEBOARDING = 'WAKEBOARDING',
  WAKESURFING = 'WAKESURFING',
  FISHING = 'FISHING',
  CRUISING = 'CRUISING'
}

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  MIXED = 'Mixed',
  ADVANCED = 'Advanced',
  PRO = 'Pro'
}

export enum WeatherStatus {
  SUNNY = 'Sunny',
  CLOUDY = 'Cloudy',
  WINDY = 'Windy',
  RISKY = 'Risky'
}

export type AppLanguage = 'EN' | 'RU' | 'CN';

export interface Captain {
  id?: string;
  name: string;
  rating: number;
  verified: boolean;
  image: string;
  licenseNumber?: string;
  languages: string[]; // Added languages
}

export interface Operator {
  id: string;
  name: string;
  category: 'wakeboarding' | 'fishing';
  city: 'dubai' | 'abudhabi';
  location: string;
  rating: number;
  reviews: number;
  sessions: number;
  emoji: string;
  pricing?: string;
  description?: string;
  floorPrice?: number;
  commissionRate?: number;
}

export interface Session {
  id: string;
  title: string;
  type: ActivityType;
  location: string;
  meetingPoint: string;
  coordinates: [number, number]; // [lat, lng]
  timeStart: Date;
  durationMinutes: number;
  pricePerSeat: number;
  originalPrice?: number; 
  currency: string;
  totalSeats: number;
  bookedSeats: number;
  minRidersToConfirm: number;
  skillLevel: SkillLevel;
  weather: WeatherStatus;
  captain: Captain;
  operatorName?: string; 
  image: string;
  isRequested?: boolean; 
  requestStatus?: 'OPEN' | 'CLAIMED'; 
}

export type UserRole = 'RIDER' | 'OPERATOR' | 'ADMIN';

export interface RiderProfileData {
  name: string;
  email: string;
  phone: string;
  image: string;
  skillLevel: SkillLevel;
  stance: 'Regular' | 'Goofy' | 'Unknown';
  weight?: number;
  paymentLast4: string;
  // Passport Data
  totalTrips: number;
  memberSince: Date;
  activitiesTried: ActivityType[];
}

export interface OperatorProfileData {
  companyName: string;
  tradeLicense: string;
  taxId: string;
  address: string;
  payoutBalance: number;
  fleetSize: number;
  activeCaptains: number;
  complianceStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
}

export interface AdminProfileData {
  name: string;
  email: string;
  totalRevenue: number;
  totalBookings: number;
}

export type TimeFilter = 'NOW' | 'TOMORROW' | 'THIS_WEEK';