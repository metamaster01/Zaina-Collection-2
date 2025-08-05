
import React from 'react';
import FacebookIcon from '../../icons/FacebookIcon';
import InstagramIcon from '../../icons/InstagramIcon';
import DashboardCard from '../common/DashboardCard';
import PlusCircleIcon from '../../icons/PlusCircleIcon';

const AdminSocialAdsSection: React.FC = () => {
  return (
    <div className="bg-admin-light-card dark:bg-admin-dark-card p-6 md:p-8 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <h1 className="text-2xl font-bold text-admin-light-text dark:text-admin-dark-text">Social Media Ads</h1>
            <p className="mt-2 text-admin-light-text-secondary dark:text-admin-dark-text-secondary">
                Overview of your ad performance on integrated social platforms.
            </p>
          </div>
          <button onClick={() => alert("Navigate to ad creation flow (simulated).")} className="bg-admin-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-admin-accent-hover flex items-center self-start sm:self-center">
                <PlusCircleIcon className="w-5 h-5 mr-2"/> Create Ad Campaign
          </button>
      </div>
      

      <div className="grid md:grid-cols-2 gap-6">
        {/* Facebook Ads */}
        <div className="p-4 border dark:border-gray-700 rounded-lg">
            <div className="flex items-center mb-4">
                <FacebookIcon className="w-8 h-8 text-blue-600 mr-3"/>
                <h3 className="text-lg font-semibold">Facebook Ads</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <DashboardCard title="Spend (30d)" value="₹1,250" />
                <DashboardCard title="ROAS" value="4.2x" changeType="positive"/>
                <DashboardCard title="Impressions" value="150K" />
                <DashboardCard title="CTR" value="2.1%"/>
            </div>
        </div>
        
        {/* Instagram Ads */}
        <div className="p-4 border dark:border-gray-700 rounded-lg">
            <div className="flex items-center mb-4">
                <InstagramIcon className="w-8 h-8 text-pink-500 mr-3"/>
                <h3 className="text-lg font-semibold">Instagram Ads</h3>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <DashboardCard title="Spend (30d)" value="₹2,100" />
                <DashboardCard title="ROAS" value="5.8x" changeType="positive"/>
                <DashboardCard title="Impressions" value="280K" />
                <DashboardCard title="CTR" value="3.5%"/>
            </div>
        </div>
      </div>
      <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">Full ad campaign management would be handled via an integration with the Meta Ads API.</p>
    </div>
  );
};

export default AdminSocialAdsSection;
