export type Language = 'en' | 'tr';

export type ScreenId =
  | 'login'
  | 'dashboard'
  | 'floors'
  | 'map'
  | 'detail'
  | 'navigation'
  | 'mydesk'
  | 'notifications'
  | 'profile';

export type DeskStatus = 'available' | 'occupied' | 'belongings' | 'out-of-service';

export interface Desk {
  id: string;
  number: number;
  floorId: string;
  status: DeskStatus;
  type: 'quiet' | 'group' | 'standard';
  hasPower: boolean;
  hasWindow: boolean;
  hasPrinterClose: boolean;
  hasRestroomClose: boolean;
  section: string;
  gridX: number; // For interactive visual map representation
  gridY: number; // For interactive visual map representation
  occupiedSince?: string;
  occupantName?: string;
  estimatedReturnTime?: string; // For belongings status
  belongingsDetectedAt?: string; // Timestamp of AI detection
}

export interface Floor {
  id: string;
  number: number;
  nameEn: string;
  nameTr: string;
  quietAreaCount: number;
  groupAreaCount: number;
}

export interface AppNotification {
  id: string;
  titleEn: string;
  titleTr: string;
  messageEn: string;
  messageTr: string;
  time: string;
  type: 'alert' | 'timer' | 'info' | 'alarm';
  read: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  studentId: string;
  departmentEn: string;
  departmentTr: string;
  avatarUrl: string;
}

export interface FilterOptions {
  quietArea: boolean;
  groupArea: boolean;
  powerOutlet: boolean;
  windowSide: boolean;
  accessible: boolean;
}
