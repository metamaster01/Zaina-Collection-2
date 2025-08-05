

import React, { useState } from 'react';
import { Order, PaymentGateway } from '../../../types';
import InputField from '../../shared/InputField';

interface AdminPaymentsSectionProps {
    orders: Order[];
    paymentGateways: PaymentGateway[];
    onSaveGateway: (gateway: PaymentGateway) => Promise<boolean>;
}

const AdminPaymentsSection: React.FC<AdminPaymentsSectionProps> = ({ orders, paymentGateways, onSaveGateway }) => {
    const [activeTab, setActiveTab] = useState<'gateways' | 'logs'>('gateways');
    const [editingGateway, setEditingGateway] = useState<PaymentGateway | null>(null);

    const handleToggleGateway = (gateway: PaymentGateway) => {
        onSaveGateway({ ...gateway, enabled: !gateway.enabled });
    };

    const handleSettingsChange = (id: string, field: string, value: string) => {
        const updatedGateway = paymentGateways.find(g => g.id === id);
        if (updatedGateway) {
            const newSettings = { ...updatedGateway.settings, [field]: value };
            onSaveGateway({ ...updatedGateway, settings: newSettings });
        }
    };
    
    return (
    <div className="bg-admin-light-card dark:bg-admin-dark-card p-6 md:p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-admin-light-text dark:text-admin-dark-text">Payments</h1>
        <p className="mt-2 text-admin-light-text-secondary dark:text-admin-dark-text-secondary mb-6">
            Manage payment gateways and view transaction history.
        </p>

        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="-mb-px flex space-x-6">
                <button onClick={() => setActiveTab('gateways')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'gateways' ? 'border-admin-accent text-admin-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    Gateways
                </button>
                <button onClick={() => setActiveTab('logs')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'logs' ? 'border-admin-accent text-admin-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    Transaction Logs
                </button>
            </nav>
        </div>

        {activeTab === 'gateways' && (
             <div className="space-y-4">
                {paymentGateways.map(gateway => (
                    <div key={gateway.id} className="p-4 border dark:border-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">{gateway.name}</p>
                            <div className="flex items-center">
                                <span className={`text-xs font-semibold mr-3 ${gateway.enabled ? 'text-green-500' : 'text-gray-500'}`}>
                                    {gateway.enabled ? 'Enabled' : 'Disabled'}
                                </span>
                                <button onClick={() => handleToggleGateway(gateway)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${gateway.enabled ? 'bg-admin-accent' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${gateway.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                                <button onClick={() => setEditingGateway(editingGateway?.id === gateway.id ? null : gateway)} className="ml-4 text-xs text-blue-500 hover:underline">
                                    {editingGateway?.id === gateway.id ? 'Close' : 'Configure'}
                                </button>
                            </div>
                        </div>
                        {editingGateway?.id === gateway.id && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                                <InputField 
                                    label="API Key" 
                                    name="apiKey" 
                                    value={gateway.settings.apiKey || ''}
                                    onChange={(e) => handleSettingsChange(gateway.id, 'apiKey', e.target.value)}
                                />
                                <InputField 
                                    label="API Secret" 
                                    name="apiSecret" 
                                    type="password"
                                    value={gateway.settings.apiSecret || ''}
                                    onChange={(e) => handleSettingsChange(gateway.id, 'apiSecret', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'logs' && (
            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                             <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-admin-dark-card divide-y divide-gray-200 dark:divide-gray-700">
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td className="px-4 py-3 text-sm font-medium text-blue-600">#{order.id.slice(-6)}</td>
                                <td className="px-4 py-3 text-sm">{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td className="px-4 py-3 text-sm">{order.customerName}</td>
                                <td className="px-4 py-3 text-sm">₹{order.totalAmount.toFixed(2)}</td>
                                <td className="px-4 py-3 text-sm capitalize">{order.paymentType || 'N/A'}</td>
                                <td className="px-4 py-3 text-sm">
                                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${order.paymentStatus === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                      {order.paymentStatus || 'Success'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {orders.length === 0 && (
                    <p className="text-center py-6 text-sm text-gray-500">No transactions yet.</p>
                )}
            </div>
        )}
    </div>
  );
};

export default AdminPaymentsSection;