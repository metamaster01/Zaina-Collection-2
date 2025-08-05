

import React, { useState, useEffect } from 'react';
import PlugIcon from '../../icons/PlugIcon';
import InputField from '../../shared/InputField';
import { IntegrationsSettings } from '../../../types';

interface AdminIntegrationsSectionProps {
  integrations: IntegrationsSettings;
  onSaveIntegrations: (settings: IntegrationsSettings) => void;
}

const otherIntegrations = [
    { name: 'Facebook Pixel', category: 'Marketing', connected: true },
    { name: 'Razorpay', category: 'Payments', connected: true },
    { name: 'Shiprocket', category: 'Shipping', connected: false },
    { name: 'Mailchimp', category: 'Marketing', connected: false },
];

const AdminIntegrationsSection: React.FC<AdminIntegrationsSectionProps> = ({ integrations, onSaveIntegrations }) => {
  const [settings, setSettings] = useState(integrations);

  useEffect(() => {
    setSettings(integrations);
  }, [integrations]);

  const handleSave = () => {
    onSaveIntegrations(settings);
    alert('Integrations settings saved!');
  };

  return (
    <div className="bg-admin-light-card dark:bg-admin-dark-card p-6 md:p-8 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-admin-light-text dark:text-admin-dark-text">Integrations</h1>
      <p className="mt-2 text-admin-light-text-secondary dark:text-admin-dark-text-secondary mb-6">
        Connect your store with third-party services to extend its functionality.
      </p>

      <div className="space-y-6">
        {/* Google Analytics Section */}
        <div className="p-4 border dark:border-gray-700 rounded-lg bg-admin-light dark:bg-admin-dark/50">
            <div className="flex items-center mb-4">
                <PlugIcon className="w-6 h-6 mr-2 text-admin-accent"/>
                <h3 className="text-lg font-semibold">Google Analytics</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Connect your Google Analytics 4 property to track live visitors and view analytics directly on your dashboard.</p>
            <div>
                <InputField 
                    label="GA4 Property ID (e.g., G-XXXXXXXXXX)"
                    name="googleAnalyticsId"
                    value={settings.googleAnalyticsId}
                    onChange={(e) => setSettings(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
                    placeholder="G-XXXXXXXXXX"
                />
            </div>
            <div className="mt-4 flex items-center justify-end">
                 <button 
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-semibold rounded-lg bg-admin-accent text-white hover:bg-admin-accent-hover"
                >
                    Save GA Settings
                </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Note: A secure backend is required for the final OAuth connection. This is a UI simulation.</p>
        </div>

        {/* Other integrations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherIntegrations.map(integ => (
                <div key={integ.name} className="p-4 border dark:border-gray-700 rounded-lg flex flex-col justify-between">
                    <div>
                        <PlugIcon className="w-6 h-6 mb-2 text-gray-400"/>
                        <h3 className="font-semibold">{integ.name}</h3>
                        <p className="text-xs text-gray-500">{integ.category}</p>
                    </div>
                    <div className="mt-4">
                        {integ.connected ? (
                            <button className="w-full text-sm py-1.5 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300">Manage</button>
                        ) : (
                            <button className="w-full text-sm py-1.5 rounded-md bg-admin-accent text-white hover:bg-admin-accent-hover">Connect</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminIntegrationsSection;