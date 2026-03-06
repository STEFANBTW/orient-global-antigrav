export type DivisionId = 'bakery' | 'dining' | 'games' | 'lounge' | 'market' | 'water' | 'global';

export const DIVISIONS = [
  { id: 'bakery', name: 'Bakery', icon: 'ChefHat', color: 'text-amber-500' },
  { id: 'dining', name: 'Dining', icon: 'Utensils', color: 'text-emerald-500' },
  { id: 'games', name: 'Games', icon: 'Gamepad2', color: 'text-blue-500' },
  { id: 'lounge', name: 'Lounge', icon: 'Wine', color: 'text-purple-500' },
  { id: 'market', name: 'Market', icon: 'Store', color: 'text-cyan-500' },
  { id: 'water', name: 'Water', icon: 'Droplets', color: 'text-sky-400' },
];

export const MOCK_PRODUCTS = [
  // Bakery
  { id: "PRD-B-001", name: "Raspberry Velvet Cake", division: "bakery", price: 45000, stock: 5, sensitivity: "high", description: "3D Configurable Artisan Cake", category: "Custom" },
  { id: "PRD-B-002", name: "Rustic Sourdough", division: "bakery", price: 3500, stock: 24, sensitivity: "low", category: "Daily" },
  { id: "PRD-B-003", name: "Butter Croissant", division: "bakery", price: 1500, stock: 50, sensitivity: "low", category: "Daily" },
  
  // Dining
  { id: "PRD-D-001", name: "Chateau Margaux 2015", division: "dining", price: 850000, stock: 2, sensitivity: "high", category: "Sommelier Vault" },
  { id: "PRD-D-002", name: "Pounded Yam & Egusi", division: "dining", price: 12500, stock: 100, sensitivity: "low", category: "Kitchen" },
  
  // Games
  { id: "PRD-G-001", name: "Lagos Saber VR Session", division: "games", price: 15000, stock: 10, sensitivity: "low", category: "VR" },
  { id: "PRD-G-002", name: "Sahara Heat VR Session", division: "games", price: 18000, stock: 10, sensitivity: "low", category: "VR" },
  
  // Lounge
  { id: "PRD-L-001", name: "Dom Perignon", division: "lounge", price: 250000, stock: 8, sensitivity: "high", category: "Bottle Service" },
  { id: "PRD-L-002", name: "Zobo Cocktail", division: "lounge", price: 5500, stock: 200, sensitivity: "low", category: "Mixology" },
  
  // Market
  { id: "PRD-M-001", name: "Imported Swiss Chocolate", division: "market", price: 8500, stock: 45, sensitivity: "low", category: "Global Goods" },
  { id: "PRD-M-002", name: "Organic Avocado Box", division: "market", price: 12000, stock: 12, sensitivity: "low", category: "Produce" },
  
  // Water
  { id: "PRD-W-001", name: "Premium Still (Batch #901)", division: "water", price: 500, stock: 5000, sensitivity: "low", category: "Subscription" },
];

export const MOCK_REQUESTS = [
  { id: "REQ-001", requester: "Staff Ahmed", division: "water", action: "Refund Annual Subscription", reason: "Customer relocation - User #882", status: "pending_hod", timestamp: "2024-03-20T10:00:00Z", sensitivity: "high" },
  { id: "REQ-002", requester: "HOD Bakery", division: "bakery", action: "Bulk Price Change (+15%)", reason: "Wheat flour supply cost surge", status: "pending_admin", timestamp: "2024-03-20T11:30:00Z", sensitivity: "high" },
  { id: "REQ-003", requester: "Staff Elena", division: "dining", action: "Comp Meal 100%", reason: "Critical delay in VIP Table #4", status: "pending_hod", timestamp: "2024-03-20T12:15:00Z", sensitivity: "low" },
  { id: "REQ-004", requester: "HOD Games", division: "games", action: "Authorize Hardware Replacement", reason: "VR Rig 04 GPU failure", status: "pending_admin", timestamp: "2024-03-20T14:00:00Z", sensitivity: "high" },
];

export const VR_RIGS = [
  { id: "RIG-01", name: "Lagos Saber Unit 1", status: "active", health: 98, lastService: "2024-03-01" },
  { id: "RIG-02", name: "Lagos Saber Unit 2", status: "active", health: 92, lastService: "2024-03-05" },
  { id: "RIG-03", name: "Sahara Heat Unit 1", status: "active", health: 85, lastService: "2024-02-28" },
  { id: "RIG-04", name: "Sahara Heat Unit 2", status: "maintenance", health: 42, lastService: "2024-01-15" },
];

export const FLEET_STATUS = [
  { id: "TRK-05", driver: "Ahmed", location: "Lekki Phase 1", status: "on-route", load: "95%", delay: "15m" },
  { id: "TRK-08", driver: "John", location: "Victoria Island", status: "delivering", load: "40%", delay: "0m" },
  { id: "TRK-12", driver: "Sarah", location: "Ikeja", status: "returning", load: "0%", delay: "5m" },
];
