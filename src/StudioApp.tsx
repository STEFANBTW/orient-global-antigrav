import React from 'react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider } from './context/role-context';

import LoginPage from './app/login/page';
import SignupPage from './app/signup/page';
import DashboardLayout from './app/dashboard/layout';
import DashboardOverview from './app/dashboard/page';

import BakeryDashboard from './app/dashboard/bakery/page';
import DiningDashboard from './app/dashboard/dining/page';
import GamesDashboard from './app/dashboard/games/page';
import LoungeDashboard from './app/dashboard/lounge/page';
import MarketDashboard from './app/dashboard/market/page';
import WaterDashboard from './app/dashboard/water/page';
import InboxPage from './app/dashboard/inbox/page';
import CMSPage from './app/dashboard/cms/page';

export default function StudioApp({ onCancel }: { onCancel: () => void }) {
  return (
    <RoleProvider>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginPage onCancel={onCancel} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="bakery" element={<BakeryDashboard />} />
            <Route path="dining" element={<DiningDashboard />} />
            <Route path="games" element={<GamesDashboard />} />
            <Route path="lounge" element={<LoungeDashboard />} />
            <Route path="market" element={<MarketDashboard />} />
            <Route path="water" element={<WaterDashboard />} />
            <Route path="inbox" element={<InboxPage />} />
            <Route path="cms" element={<CMSPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </MemoryRouter>
    </RoleProvider>
  );
}
