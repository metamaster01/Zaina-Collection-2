
import React from 'react';
import { Order } from '../../../types';
import Modal from '../../shared/Modal';

interface AdminOrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
}

const AdminOrderDetailModal: React.FC<AdminOrderDetailModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300';
      case 'Shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300';
      case 'Processing': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/30 dark:text-yellow-300';
      case 'Pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300';
      case 'Cancelled':
      case 'Refunded': return 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700';
    }
  };

  const deliveryCharge = order.deliveryCharge || 0;
  const subtotal = order.totalAmount - deliveryCharge;

  return (
    <Modal isOpen={!!order} onClose={onClose} title={`Order Details: #${order.id.slice(-6).toUpperCase()}`} size="lg">
      <div className="space-y-4 text-sm">
        <div className="p-3 bg-admin-light dark:bg-admin-dark rounded-lg flex flex-col sm:flex-row justify-between">
          <div>
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            <p><strong>Payment:</strong> {order.paymentType || 'N/A'}</p>
            <p><strong>Delivery:</strong> <span className="capitalize">{order.deliveryType || 'Standard'}</span></p>
          </div>
          <div className="mt-2 sm:mt-0 text-left sm:text-right">
            <p className="mb-1"><strong>Status:</strong></p>
            <span className={`px-2.5 py-1 font-semibold rounded-full text-xs ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-admin-text dark:text-admin-dark-text mb-2">Items Ordered</h4>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2 border-t border-b py-2 border-gray-200 dark:border-gray-700">
{(order.items ?? []).map((item, index) => {
  const attrs = (item.selectedVariant?.attributes
                 ?? item.variantSnapshot  // if you keep raw prisma
                 ?? {}) as Record<string, any>;

  return (
    <div key={index} className="flex items-center gap-4">
      <img src={item.imageUrl ?? item.product?.imageUrl ?? ''} alt={item.name ?? item.product?.name ?? 'Product'} className="w-16 h-20 object-cover rounded-md" />
      <div className="flex-grow">
        <p className="font-medium text-admin-text dark:text-admin-dark-text">
          {item.name ?? item.product?.name ?? '—'}
        </p>
        <p className="text-xs text-admin-text-secondary dark:text-dark-admin-text-secondary">
          SKU: {item.sku ?? item.product?.sku ?? '—'}
        </p>
        <p className="text-xs text-admin-text-secondary dark:text-dark-admin-text-secondary capitalize">
          {Object.entries(attrs).map(([k, v]) => `${k}: ${v}`).join(' / ')}
          {' | '}Qty: {item.quantity}
        </p>
      </div>
      <p className="font-medium text-sm text-admin-text dark:text-admin-dark-text">
        ₹{(item.priceAtPurchase * item.quantity).toFixed(2)}
      </p>
    </div>
  );
})}

          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-admin-light dark:bg-admin-dark rounded-lg">
            <h4 className="font-semibold text-admin-text dark:text-admin-dark-text mb-1">Shipping Address</h4>
            <address className="not-italic text-admin-text-secondary dark:text-dark-admin-text-secondary">
              {order.shippingAddress.fullName}<br/>
              {order.shippingAddress.addressLine1}<br/>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br/>
              {order.shippingAddress.country}
            </address>
          </div>
          <div className="p-3 bg-admin-light dark:bg-admin-dark rounded-lg">
             <h4 className="font-semibold text-admin-text dark:text-admin-dark-text mb-1">Order Summary</h4>
             <p className="flex justify-between"><span>Subtotal:</span> <span>₹{subtotal.toFixed(2)}</span></p>
             <p className="flex justify-between"><span>Delivery Charge:</span> <span>₹{deliveryCharge.toFixed(2)}</span></p>
             <hr className="my-1 border-gray-300 dark:border-gray-600"/>
             <p className="font-bold flex justify-between text-base mt-1"><span>Total:</span> <span>₹{order.totalAmount.toFixed(2)}</span></p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminOrderDetailModal;
