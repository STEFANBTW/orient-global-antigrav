
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'admin' | 'admin_staff' | 'admin_head' | 'admin_boss';
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
  targetRoleId: 'admin';
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
  { id: 'admin', name: 'Admin', email: 'ceo@og.com', role: 'admin', division: 'global', avatar: 'A' },
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
        staffName: 'Admin',
        staffRole: 'Admin',
        approverName: 'Admin',
        approverRole: 'Admin',
        reason: 'Increased ingredient costs',
        division: 'bakery'
      },
      {
        id: 'LOG-002',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        itemName: 'Dom Perignon',
        oldValue: '₦220,000',
        newValue: '₦250,000',
        staffName: 'Admin',
        staffRole: 'Admin',
        approverName: 'Admin',
        approverRole: 'Admin',
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
  const [skus, setSkus] = useState<SKUItem[]>([
    { id: 'SKU-001', sku: 'MKT-IMP-902', name: 'Swiss Dark Chocolate', brand: 'Lindt', category: 'Imported', price: 8500, stock: 45, isBOGOF: false, isUnder5: false },
    { id: 'p2', sku: 'PRO-002', name: 'Red Tomatoes', brand: 'Jos Farms', category: 'Produce', price: 1200, stock: 120, isBOGOF: false, isUnder5: false }
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

  // Global SSE Listener for Zero-Touch Updates
  useEffect(() => {
    const sse = new EventSource('/api/admin/sse');
    sse.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === 'stock_update') {
          setSkus(prev => prev.map(s => s.id === payload.sku ? { ...s, stock: payload.new_stock } : s));
        }
      } catch (err) {
        console.error("SSE parse error", err);
      }
    };
    return () => sse.close();
  }, []);

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
        staffRole: 'Admin',
        approverName: currentUser?.name || 'Admin',
        approverRole: 'Admin',
        reason: request.description,
        division: request.division
      });
    }
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status, declineReason: reason } : r));
  };

  const canExecuteLocally = (sensitivity: 'low' | 'high') => {
    if (!currentUser) return false;
    return currentUser.role === 'admin';
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
