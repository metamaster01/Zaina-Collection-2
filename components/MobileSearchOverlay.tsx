
import React, { useEffect, useRef, useState } from 'react';
import { Product, PageName } from '../types'; 
import SearchIcon from './icons/SearchIcon';

interface MobileSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  navigateToPage: (page: PageName, data?: any) => void;
  products: Product[];
}

const MobileSearchOverlay: React.FC<MobileSearchOverlayProps> = ({ isOpen, onClose, navigateToPage, products }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = '';
      setSearchTerm('');
      setSuggestions([]);
    }
    return () => {
      document.body.style.overflow = ''; 
    };
  }, [isOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 1) {
        const filteredSuggestions = products.filter(p => 
            p.name.toLowerCase().includes(value.toLowerCase()) ||
            p.category.toLowerCase().includes(value.toLowerCase()) ||
            p.tags?.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
        ).slice(0, 8); // Limit suggestions
        
        setSuggestions(filteredSuggestions);
    } else {
        setSuggestions([]);
    }
  };

  const handleSuggestionClick = (product: Product) => {
    navigateToPage('productDetail', product);
    onClose();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchTerm.length > 1) {
          navigateToPage('shop', { searchTerm });
          onClose();
      }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[70] bg-zaina-white/95 dark:bg-dark-zaina-bg-card/95 backdrop-blur-md flex flex-col p-4 transition-opacity duration-300 ease-in-out md:hidden`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-search-title"
    >
      <div className="w-full max-w-md mt-6 mx-auto flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <h2 id="mobile-search-title" className="text-xl font-semibold text-zaina-text-primary dark:text-dark-zaina-text-primary">Search</h2>
          <button onClick={onClose} className="text-zaina-text-primary dark:text-dark-zaina-text-secondary p-2" aria-label="Close search">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="relative mb-6">
          <input
            ref={inputRef}
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="What are you looking for?"
            className="w-full pl-12 pr-4 py-3 text-lg rounded-lg border-2 border-zaina-neutral-medium dark:border-dark-zaina-neutral-medium focus:border-zaina-primary dark:focus:border-dark-zaina-primary focus:ring-0 bg-transparent text-zaina-text-primary dark:text-dark-zaina-text-primary outline-none"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="w-6 h-6 text-zaina-text-secondary dark:text-dark-zaina-text-secondary" />
          </div>
        </form>

        <div className="flex-grow overflow-y-auto">
            {suggestions.length > 0 ? (
                <ul className="space-y-4">
                    {suggestions.map(product => (
                        <li key={product.id}>
                            <button onClick={() => handleSuggestionClick(product)} className="w-full text-left flex items-center p-2 hover:bg-zaina-sky-blue-light/50 dark:hover:bg-dark-zaina-sky-blue-light/30 rounded-lg transition-colors">
                                <img src={product.imageUrl} alt={product.name} className="w-16 h-20 object-cover rounded-md mr-4"/>
                                <div className="flex-grow min-w-0">
                                    <p className="font-semibold text-zaina-text-primary dark:text-dark-zaina-text-primary truncate">{product.name}</p>
                                    <p className="text-sm text-zaina-text-secondary dark:text-dark-zaina-text-secondary">₹{product.price.toFixed(2)}</p>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                searchTerm.length > 1 && <p className="text-center text-zaina-text-secondary dark:text-dark-zaina-text-secondary">No results found for "{searchTerm}".</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default MobileSearchOverlay;
