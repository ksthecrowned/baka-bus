export interface User {
  id: string;
  email: string;
  name: string;
  city: string;
  preferredLines: string[];
  darkMode: boolean;
  notifications: boolean;
  createdAt: Date;
}

export interface City {
  id: string;
  name: string;
  active: boolean;
}

export interface TransportLine {
  id: string;
  name: string;
  cityId: string;
  route: string;
  active: boolean;
}

export interface Report {
  id: string;
  userId: string;
  userName: string;
  cityId: string;
  lineId: string;
  lineName: string;
  type: 'no_bus' | 'overpriced' | 'overcrowded' | 'breakdown' | 'other';
  description: string;
  imageUrl?: string;
  price?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportType {
  key: 'no_bus' | 'overpriced' | 'overcrowded' | 'breakdown' | 'other';
  label: string;
  description: string;
  icon: string;
  color: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}