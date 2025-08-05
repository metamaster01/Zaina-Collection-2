

import React, { useState } from 'react';
import { NavLinkItem, Notification, PageName, UserProfile, AdminUser } from '../../../types';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

interface AdminLayoutProps {
  navLinks: any[];
  activeNavLinkId: string;
  onNavLinkClick: (id: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  pageTitle: string;
  onLogout: () => void;
  children: React.ReactNode;
  onNavigate: (page: PageName | string, data?: any) => void;
  currentUser: UserProfile | AdminUser | null;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  navLinks,
  activeNavLinkId,
  onNavLinkClick,
  isDarkMode,
  toggleDarkMode,
  pageTitle,
  onLogout,
  onNavigate,
  currentUser,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="bg-admin-light dark:bg-admin-dark min-h-screen font-inter text-admin-light-text dark:text-admin-dark-text">
      <AdminSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        navLinks={navLinks}
        activeNavLinkId={activeNavLinkId}
        onNavLinkClick={onNavLinkClick}
      />
      <div
        className={`relative min-h-screen transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        }`}
      >
        <AdminHeader
          pageTitle={pageTitle}
          onLogout={onLogout}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onNavigate={onNavigate}
          currentUser={currentUser}
        />
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
       {/* Mobile Overlay */}
       <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity lg:hidden ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
    </div>
  );
};

export default AdminLayout;