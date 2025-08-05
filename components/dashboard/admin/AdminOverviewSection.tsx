
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PageName, AdminDashboardStats } from '../../../types';
import DashboardCard from '../common/DashboardCard';
import DollarSignIcon from '../../icons/DollarSignIcon'; 
import ShoppingCartIcon from '../../icons/ShoppingCartIcon';
import PackageIcon from '../../icons/PackageIcon';
import UsersIcon from '../../icons/UsersIcon';

const API_BASE_URL = 'https://zaina-collection-backend.vercel.app';

interface AdminOverviewSectionProps {
  navigateToPage: (page: PageName, data?: any) => void;
}

const AdminOverviewSection: React.FC<AdminOverviewSectionProps> = ({ navigateToPage }) => {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('zaina-authToken');
            const response = await axios.get(`${API_BASE_URL}/admin/dashboard-stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to load dashboard data.");
        } finally {
            setIsLoading(false);
        }
    };
    fetchStats();
  }, []);

  if (isLoading) return <div className="text-center p-8">Loading dashboard statistics...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!stats) return <div className="text-center p-8">No statistical data available.</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Sales"
          value={`₹${stats.totalSales.toLocaleString('en-IN')}`}
          icon={DollarSignIcon}
        />
        <DashboardCard
          title="New Orders"
          value={stats.newOrders}
          icon={ShoppingCartIcon}
        />
         <DashboardCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={UsersIcon}
        />
        <DashboardCard
          title="Low Stock Items"
          value={stats.lowStockItems}
          icon={PackageIcon}
          changeType={stats.lowStockItems > 0 ? "negative" : "neutral"}
        />
      </div>

      <div className="bg-admin-light-card dark:bg-dark-admin-card p-6 rounded-2xl shadow-admin-soft">
        <h3 className="text-lg font-semibold text-admin-text-primary dark:text-dark-admin-text-primary mb-4">
            Revenue Over Time
        </h3>
        <div className="h-72 bg-admin-light dark:bg-admin-dark/50 rounded-lg flex items-center justify-center text-admin-text-secondary dark:text-dark-admin-text-secondary">
            Revenue Chart Placeholder
        </div>
      </div>
    </div>
  );
};

export default AdminOverviewSection;
