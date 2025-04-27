
import React, { ReactNode } from 'react';
import Navbar from '@/components/shared/Navbar';
import Sidebar from '@/components/shared/Sidebar';
import { useData } from '@/context/DataContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { currentUser } = useData();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar userRole={currentUser?.role} />
        <main className="flex-grow p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
