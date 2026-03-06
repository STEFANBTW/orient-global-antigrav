
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'admin_boss' | 'admin_head' | 'admin_staff';
export type DivisionId = 'bakery' | 'dining' | 'games' | 'lounge' | 'market' | 'water' | 'global';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  division: DivisionId;
  avatar: string;
}

export interface ApprovalRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  targetRoleId: 'admin_head' | 'admin_boss';
  division: DivisionId;
  actionLabel: string;
  description: string;
  status: 'pending' | 'approved' | 'declined';
  timestamp: string;
  declineReason?: string;
  oldValue?: string;
  newValue?: string;
  payload?: any;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  itemName: string;
  oldValue: string;
  newValue: string;
  staffName: string;
  staffRole: string;
  approverName: string;
  approverRole: string;
  reason: string;
  division: DivisionId;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  ingredients?: string[];
  isAvailable: boolean;
  isChefSpecial?: boolean;
  imageUrl: string;
  status: 'live' | 'staged';
  isNew?: boolean;
}

export interface LabDrink {
  id: string;
  name: string;
  status: 'testing' | 'featured' | 'retired';
  teaserText: string;
  visualizerSettings: {
    themeColor: string;
    animationSpeed: 'slow' | 'pulse' | 'rapid';
    backgroundVideoUrl: string;
  };
}

export interface VIPBooking {
  id: string;
  customerName: string;
  tableId: string;
  date: string;
  partySize: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface WaterLog {
  id: string;
  date: string;
  ph: number;
  tds: number;
  status: 'nominal' | 'alert' | 'critical';
}

export interface SKUItem {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: 'Produce' | 'Pantry' | 'Beverages' | 'Household' | 'Imported';
  price: number;
  stock: number;
  isBOGOF: boolean;
  isUnder5: boolean;
}

export interface Tournament {
  id: string;
  title: string;
  prizePool: number;
  status: string;
  game_title: string;
}

export interface HardwareRig {
  id: string;
  type: string;
  status: string;
  health: number;
}

export interface RoleContextType {
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  requests: ApprovalRequest[];
  auditLogs: AuditLog[];
  createRequest: (request: Omit<ApprovalRequest, 'id' | 'timestamp' | 'status'>) => void;
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  updateRequestStatus: (id: string, status: 'approved' | 'declined', reason?: string) => void;
  activeDivisionView: DivisionId;
  setActiveDivisionView: (division: DivisionId) => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
  canExecuteLocally: (sensitivity: 'low' | 'high') => boolean;
  
  // Division States
  diningMenu: MenuItem[];
  loungeMenu: MenuItem[];
  labDrinks: LabDrink[];
  vipBookings: VIPBooking[];
  waterLogs: WaterLog[];
  skus: SKUItem[];
  
  tournaments: Tournament[];
  hardwareRigs: HardwareRig[];
  sommelierList: any[];
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const MOCK_PERSONAS: UserProfile[] = [
  { id: 'BOSS-001', name: 'Aliko Dangote', email: 'boss1@orient.com', role: 'admin_boss', division: 'global', avatar: 'AD' },
  { id: 'BOSS-002', name: 'Tony Elumelu', email: 'boss2@orient.com', role: 'admin_boss', division: 'global', avatar: 'TE' },
  { id: 'HOD-B', name: 'Chef Tunde', email: 'hod.bakery@orient.com', role: 'admin_head', division: 'bakery', avatar: 'CT' },
  { id: 'HOD-D', name: 'Sade Adu', email: 'hod.dining@orient.com', role: 'admin_head', division: 'dining', avatar: 'SA' },
  { id: 'HOD-G', name: 'Obi Okoro', email: 'hod.games@orient.com', role: 'admin_head', division: 'games', avatar: 'OO' },
  { id: 'HOD-L', name: 'Femi Kuti', email: 'hod.lounge@orient.com', role: 'admin_head', division: 'lounge', avatar: 'FK' },
  { id: 'HOD-M', name: 'Ngozi Iweala', email: 'hod.market@orient.com', role: 'admin_head', division: 'market', avatar: 'NI' },
  { id: 'HOD-W', name: 'Amina Mohammed', email: 'hod.water@orient.com', role: 'admin_head', division: 'water', avatar: 'AM' },
  { id: 'STAFF-B', name: 'Ahmed Lawal', email: 'staff.bakery@orient.com', role: 'admin_staff', division: 'bakery', avatar: 'AL' },
  { id: 'STAFF-D', name: 'Michael Obi', email: 'staff.dining@orient.com', role: 'admin_staff', division: 'dining', avatar: 'MO' },
  { id: 'STAFF-G', name: 'Liam O\'Connor', email: 'staff.games@orient.com', role: 'admin_staff', division: 'games', avatar: 'LO' },
  { id: 'STAFF-L', name: 'Elena Rossi', email: 'staff.lounge@orient.com', role: 'admin_staff', division: 'lounge', avatar: 'ER' },
  { id: 'STAFF-M', name: 'Sarah Jenkins', email: 'staff.market@orient.com', role: 'admin_staff', division: 'market', avatar: 'SJ' },
  { id: 'STAFF-W', name: 'David K.', email: 'staff.water@orient.com', role: 'admin_staff', division: 'water', avatar: 'DK' },
];

export function RoleProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [activeDivisionView, setActiveDivisionView] = useState<DivisionId>('global');
  const [activeModule, setActiveModule] = useState<string>('');
  const [requests, setRequests] = useState<ApprovalRequest[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Initial Mock Audit Logs
  useEffect(() => {
    setAuditLogs([
      {
        id: 'LOG-001',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        itemName: 'Raspberry Velvet Cake',
        oldValue: '₦40,000',
        newValue: '₦45,000',
        staffName: 'Ahmed Lawal',
        staffRole: 'Staff',
        approverName: 'Chef Tunde',
        approverRole: 'Manager',
        reason: 'Increased ingredient costs',
        division: 'bakery'
      },
      {
        id: 'LOG-002',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        itemName: 'Dom Perignon',
        oldValue: '₦220,000',
        newValue: '₦250,000',
        staffName: 'Elena Rossi',
        staffRole: 'Staff',
        approverName: 'Femi Kuti',
        approverRole: 'Manager',
        reason: 'Vintage scarcity adjustment',
        division: 'lounge'
      }
    ]);
  }, []);

  // Dining
  const [diningMenu] = useState<MenuItem[]>([
    { id: 'MENU-001', name: 'Pounded Yam & Egusi', category: 'Traditional', price: 12500, description: 'Hand-pounded yam with rich egusi soup.', ingredients: ['Yam', 'Melon Seed'], isAvailable: true, imageUrl: 'https://picsum.photos/seed/yam/400/300', status: 'live' },
  ]);

  // Lounge
  const [loungeMenu] = useState<MenuItem[]>([
    { id: 'L-001', name: 'Dom Perignon', category: 'Bottle Service', price: 250000, description: 'Vintage Champagne.', isAvailable: true, imageUrl: 'https://picsum.photos/seed/lounge1/400/300', status: 'live' },
  ]);
  const [labDrinks] = useState<LabDrink[]>([
    { id: 'LAB-402', name: 'Zobo Infusion v2', status: 'testing', teaserText: 'Hibiscus meets cold nitrogen.', visualizerSettings: { themeColor: '#FF00FF', animationSpeed: 'pulse', backgroundVideoUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1eHhkd3R4eHh4eHh4eHh4eHh4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKDkDbIDJieKbVm/giphy.mp4' } }
  ]);
  const [vipBookings] = useState<VIPBooking[]>([
    { id: 'B-001', customerName: 'Chief Okoro', tableId: 'V-04', date: '2024-05-20', partySize: 4, status: 'pending' }
  ]);

  // Water
  const [waterLogs] = useState<WaterLog[]>([
    { id: 'W-001', date: '2024-05-18', ph: 7.2, tds: 125, status: 'nominal' }
  ]);

  // Market
  const [skus] = useState<SKUItem[]>([
    { id: 'SKU-001', sku: 'MKT-IMP-902', name: 'Swiss Dark Chocolate', brand: 'Lindt', category: 'Imported', price: 8500, stock: 45, isBOGOF: false, isUnder5: false }
  ]);

  const [tournaments] = useState([
    { id: 'TOUR-01', title: 'Cyber Odyssey 2024', prizePool: 50000000, status: 'live', game_title: 'Lagos Saber' },
  ]);
  const [hardwareRigs] = useState([
    { id: 'RIG-01', type: 'Pro VR', status: 'available', health: 98 },
    { id: 'RIG-02', type: 'Pro VR', status: 'maintenance', health: 42 },
  ]);
  const [sommelierList] = useState([]);

  useEffect(() => {
    if (currentUser) setActiveDivisionView(currentUser.division);
  }, [currentUser]);

  const createRequest = (req: Omit<ApprovalRequest, 'id' | 'timestamp' | 'status'>) => {
    const newRequest: ApprovalRequest = {
      ...req,
      id: `REQ-${Math.floor(Math.random() * 10000)}`,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    setRequests(prev => [newRequest, ...prev]);
  };

  const addAuditLog = (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog: AuditLog = {
      ...log,
      id: `LOG-${Math.floor(Math.random() * 100000)}`,
      timestamp: new Date().toISOString(),
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateRequestStatus = (id: string, status: 'approved' | 'declined', reason?: string) => {
    const request = requests.find(r => r.id === id);
    if (status === 'approved' && request && request.oldValue && request.newValue) {
      addAuditLog({
        itemName: request.actionLabel,
        oldValue: request.oldValue,
        newValue: request.newValue,
        staffName: request.requesterName,
        staffRole: 'Staff',
        approverName: currentUser?.name || 'Manager',
        approverRole: currentUser?.role === 'admin_boss' ? 'Director' : 'Manager',
        reason: request.description,
        division: request.division
      });
    }
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status, declineReason: reason } : r));
  };

  const canExecuteLocally = (sensitivity: 'low' | 'high') => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin_boss') return true;
    if (currentUser.role === 'admin_head') return sensitivity === 'low';
    return false;
  };

  return (
    <RoleContext.Provider value={{ 
      currentUser, setCurrentUser, requests, auditLogs, createRequest, addAuditLog, updateRequestStatus,
      activeDivisionView, setActiveDivisionView, activeModule, setActiveModule, canExecuteLocally,
      diningMenu, loungeMenu, labDrinks, vipBookings, waterLogs, skus,
      tournaments, hardwareRigs, sommelierList
    }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRoles() {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useRoles must be used within a RoleProvider');
  return context;
}
