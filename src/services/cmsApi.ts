export interface Division {
  id: string;
  name: string;
  slug: string;
  theme_config: any;
  active_status: boolean;
}

export interface ContentBlock {
  id: string;
  division_id: string;
  block_type: string;
  content_payload: any;
  order_index: number;
  published_at: string | null;
}

export interface WeeklyUpdate {
  id: string;
  division_id: string;
  title: string;
  status: 'draft' | 'pending_review' | 'published';
  scheduled_for: string | null;
  changeset: any;
}

export const cmsApi = {
  // Public
  getDivisionContent: async (slug: string) => {
    const res = await fetch(`/api/v1/content/${slug}`);
    return res.json();
  },
  
  // Admin
  getDivisions: async (): Promise<{ divisions: Division[] }> => {
    const res = await fetch('/api/admin/divisions');
    return res.json();
  },
  
  getAllContentBlocks: async (): Promise<{ contentBlocks: ContentBlock[] }> => {
    const res = await fetch('/api/admin/content');
    return res.json();
  },
  
  createContentBlock: async (data: Partial<ContentBlock>): Promise<ContentBlock> => {
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  
  updateContentBlock: async (id: string, data: Partial<ContentBlock>): Promise<ContentBlock> => {
    const res = await fetch(`/api/admin/content/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  
  getWeeklyUpdates: async (): Promise<{ updates: WeeklyUpdate[] }> => {
    const res = await fetch('/api/admin/updates');
    return res.json();
  },
  
  publishUpdates: async (updateIds: string[]): Promise<any> => {
    const res = await fetch('/api/admin/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ update_ids: updateIds })
    });
    return res.json();
  },

  // --- Product Management ---

  getProducts: async () => {
    const response = await fetch('/api/admin/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  createProduct: async (product: any) => {
    const response = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  updateProduct: async (id: string, product: any) => {
    const response = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  deleteProduct: async (id: string) => {
    const response = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  }
};
