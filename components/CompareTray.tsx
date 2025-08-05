

import React from 'react';
import { Product } from '../types';
import RatingStars from './RatingStars';
import TrashIcon from './icons/TrashIcon';
import EyeIcon from './icons/EyeIcon';
import CloseIcon from './icons/CloseIcon';

interface CompareTrayProps {
  isOpen: boolean;
  products: Product[];
  onClose: () => void;
  onRemoveFromComparison: (productId: string) => void;
  onViewProductDetail: (product: Product) => void;
}

const CompareTray: React.FC<CompareTrayProps> = ({
  isOpen,
  products,
  onClose,
  onRemoveFromComparison,
  onViewProductDetail,
}) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 z-[99] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-xs sm:max-w-sm bg-zaina-white dark:bg-dark-zaina-bg-card shadow-2xl z-[100] p-6 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-tray-title"
      >
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
              <h2 id="compare-tray-title" className="text-xl font-heading-playfair font-semibold text-zaina-text-primary dark:text-dark-zaina-text-primary">
              Compare Products ({products.length})
              </h2>
              <button
              onClick={onClose}
              className="text-zaina-slate-gray dark:text-dark-zaina-text-secondary hover:text-zaina-primary dark:hover:text-dark-zaina-primary p-1 rounded-full"
              aria-label="Close comparison tray"
              >
                  <CloseIcon className="w-6 h-6"/>
              </button>
          </div>

          {products.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center">
                  <p className="text-zaina-slate-gray dark:text-dark-zaina-text-secondary">No products selected for comparison.</p>
                  <p className="text-xs text-zaina-slate-gray dark:text-dark-zaina-text-secondary mt-1">Add up to 4 products to compare.</p>
              </div>
          ) : (
              <div className="flex-grow overflow-y-auto space-y-4 -mr-2 pr-2">
              {products.map(product => (
                  <div key={product.id} className="flex items-start p-3 border border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium rounded-lg bg-zaina-neutral-light/50 dark:bg-dark-zaina-neutral-medium/30">
                  <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-20 h-24 object-cover rounded-md mr-4 flex-shrink-0"
                  />
                  <div className="flex-grow">
                      <h3 className="text-sm font-semibold text-zaina-text-primary dark:text-dark-zaina-text-primary mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-base font-bold text-zaina-primary dark:text-dark-zaina-primary mb-1">₹{product.price.toFixed(2)}</p>
                      {product.rating && <RatingStars rating={product.rating} starSize="h-3.5 w-3.5" />}
                      <div className="mt-2 flex items-center space-x-2">
                          <button
                              onClick={() => { onViewProductDetail(product); onClose(); }}
                              className="text-xs text-zaina-primary dark:text-dark-zaina-primary hover:underline flex items-center"
                              title="View product details"
                          >
                              <EyeIcon className="w-3.5 h-3.5 mr-1" /> Details
                          </button>
                          <button
                              onClick={() => onRemoveFromComparison(product.id)}
                              className="text-xs text-zaina-deep-red-accent dark:text-red-400 hover:underline flex items-center"
                              title="Remove from comparison"
                          >
                              <TrashIcon className="w-3.5 h-3.5 mr-1" /> Remove
                          </button>
                      </div>
                  </div>
                  </div>
              ))}
              </div>
          )}

          {products.length > 0 && (
              <div className="mt-6 pt-4 border-t border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium flex-shrink-0">
              <button
                  onClick={() => alert("Full comparison page/feature to be implemented.")}
                  className="w-full bg-zaina-primary dark:bg-dark-zaina-primary text-zaina-white dark:text-dark-zaina-text-primary font-semibold py-2.5 px-6 rounded-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={products.length < 2}
              >
                  Compare All Items
              </button>
              </div>
          )}
      </div>
    </>
  );
};

export default CompareTray;