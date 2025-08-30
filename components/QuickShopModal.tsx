
// import React, { useState, useMemo, useEffect } from 'react';
// import { Product, ProductVariant } from '../types';
// import CloseIcon from './icons/CloseIcon';

// interface QuickShopModalProps {
//   product: Product | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onAddToCart: (product: Product, quantity: number, selectedVariant: ProductVariant) => void;
// }

// const QuickShopModal: React.FC<QuickShopModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
//     const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    
//     // Determine the available variant attributes for the product
//     const variantAttributes = useMemo(() => {
//         if (!product?.variants) return [];
//         const attributes = new Set<string>();
//         product.variants.forEach(variant => {
//             Object.keys(variant.attributes).forEach(attr => attributes.add(attr));
//         });
//         return Array.from(attributes);
//     }, [product]);

//     // Reset state when product changes
//     useEffect(() => {
//         if (product) {
//             // Pre-select the first option for each attribute if available
//             const initialSelection: Record<string, string> = {};
//             variantAttributes.forEach(attr => {
//                 const firstValue = product.variants?.[0]?.attributes[attr];
//                 if(firstValue) {
//                    // This part is tricky without more complex logic.
//                    // For simplicity, we just clear selections.
//                 }
//             });
//             setSelectedOptions({});
//         }
//     }, [product, variantAttributes]);

//     const getAvailableOptions = (attributeName: string) => {
//         if (!product?.variants) return [];
        
//         // Filter variants that match other selected options
//         const partiallyMatchingVariants = product.variants.filter(variant => {
//             return Object.entries(selectedOptions).every(([key, value]) => {
//                 // Ignore the current attribute being populated
//                 if (key === attributeName) return true;
//                 return variant.attributes[key] === value;
//             });
//         });

//         // Get unique, available values for the current attribute from the filtered variants
//         const options = new Map<string, boolean>(); // value -> isAvailable
//         partiallyMatchingVariants.forEach(variant => {
//             const value = variant.attributes[attributeName];
//             if (value) {
//                 const isStockAvailable = variant.stockQuantity > 0;
//                 if (!options.has(value) || isStockAvailable) {
//                     options.set(value, isStockAvailable);
//                 }
//             }
//         });
        
//         return Array.from(options.entries());
//     };

//     const handleOptionSelect = (attributeName: string, value: string) => {
//         setSelectedOptions(prev => {
//             const newSelection = { ...prev };
//             if (newSelection[attributeName] === value) {
//                 delete newSelection[attributeName];
//             } else {
//                 newSelection[attributeName] = value;
//             }
//             // This is a simplified logic. A real implementation might need to
//             // reset dependent selections when a higher-level one changes.
//             return newSelection;
//         });
//     };
    
//     const currentVariant = useMemo(() => {
//         if (!product?.variants || Object.keys(selectedOptions).length !== variantAttributes.length) {
//             return undefined;
//         }
//         return product.variants.find(variant => 
//             variantAttributes.every(attr => variant.attributes[attr] === selectedOptions[attr])
//         );
//     }, [product, selectedOptions, variantAttributes]);


//   const handleAddToCartClick = () => {
//     if (product && currentVariant) {
//         if (currentVariant.stockQuantity > 0) {
//             onAddToCart(product, 1, currentVariant);
//             onClose();
//         } else {
//             alert("This variant is out of stock.");
//         }
//     } else {
//       alert("Please select all variant options.");
//     }
//   };

//   const priceToShow = currentVariant?.price ?? product?.price ?? 0;
//   const mrpToShow = product?.mrp ?? 0;
//   const isAddToCartDisabled = !currentVariant;
//   const imageToShow = currentVariant?.imageUrl || product?.imageUrl || '';


//   if (!isOpen || !product) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="quick-shop-title">
//       <div className="modal-content w-full max-w-md" onClick={(e) => e.stopPropagation()}>
//         <button onClick={onClose} className="absolute top-3 right-3 text-zaina-slate-gray p-1.5 rounded-full hover:bg-zaina-neutral-medium dark:hover:bg-dark-zaina-neutral-medium transition-colors"><CloseIcon className="w-5 h-5"/></button>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <div className="w-full sm:w-1/3 flex-shrink-0">
//             <img src={imageToShow} alt={product.name} className="w-full aspect-[3/4] object-cover rounded-md shadow-lg"/>
//           </div>
//           <div className="flex-grow">
//             <h2 id="quick-shop-title" className="text-xl font-heading-playfair font-semibold mb-1">{product.name}</h2>
//             <div className="flex items-baseline mb-3">
//               <p className="text-xl font-bold text-zaina-gold">₹{priceToShow.toFixed(2)}</p>
//               {mrpToShow > priceToShow && (
//                   <span className="ml-2 text-sm text-zaina-text-secondary line-through">₹{mrpToShow.toFixed(2)}</span>
//               )}
//             </div>

//             {variantAttributes.map(attributeName => {
//                 const options = getAvailableOptions(attributeName);
//                 if (options.length === 0) return null;

//                 return (
//                     <div key={attributeName} className="mb-3">
//                         <span className="text-sm font-semibold capitalize">{attributeName}: <span className="font-normal">{selectedOptions[attributeName]}</span></span>
//                         <div className="flex flex-wrap gap-1.5 mt-1.5">
//                             {options.map(([value, isAvailable]) => {
//                                 const isSelected = selectedOptions[attributeName] === value;
//                                 return (
//                                     <button 
//                                         key={value}
//                                         onClick={() => handleOptionSelect(attributeName, value)}
//                                         disabled={!isAvailable}
//                                         className={`relative px-3 py-1 text-xs font-medium rounded-md border-2 transition-all
//                                         ${isSelected ? 'bg-zaina-primary border-zaina-primary text-white' : 'border-zaina-neutral-medium bg-zaina-white dark:bg-dark-zaina-bg-card'}
//                                         ${!isAvailable ? 'text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed' : ''}`}
//                                     >
//                                         {value}
//                                         {!isAvailable && <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center"><div className="w-[80%] h-px bg-gray-400 transform rotate-[-20deg]"></div></span>}
//                                     </button>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 )
//             })}
             
//              <button onClick={handleAddToCartClick} disabled={isAddToCartDisabled} className="w-full bg-zaina-gold text-white font-semibold py-3 rounded-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4">
//                 {isAddToCartDisabled ? 'Select Options' : 'Add to Cart'}
//               </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuickShopModal;


import React, { useState, useMemo, useEffect } from 'react';
import { Product, ProductVariant } from '../types';
import CloseIcon from './icons/CloseIcon';

interface QuickShopModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedVariant: ProductVariant) => void;
}

const normKey = (k: string) => k.trim().toLowerCase();
const normVal = (v: unknown) => String(v ?? '').trim();

const QuickShopModal: React.FC<QuickShopModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({}); // keys are normalized

  // Precompute normalized variants and a display label for each normalized attribute key
  const { normalizedVariants, attributes } = useMemo(() => {
    if (!product?.variants) return { normalizedVariants: [] as Array<ProductVariant & { __norm: Record<string, string> }>, attributes: [] as Array<{ key: string; label: string }> };

    // Normalize every variant's attributes
    const nv = product.variants.map(v => {
      const __norm: Record<string, string> = {};
      Object.entries(v.attributes || {}).forEach(([k, val]) => {
        __norm[normKey(k)] = normVal(val);
      });
      return { ...v, __norm };
    });

    // Build a unique attribute list by normalized key, but remember a friendly label
    const labelByKey = new Map<string, string>();
    nv.forEach(v => {
      Object.entries(v.attributes || {}).forEach(([k]) => {
        const key = normKey(k);
        if (!labelByKey.has(key)) {
          // Use the first seen casing/spacing as the display label
          labelByKey.set(key, k.trim());
        }
      });
    });

    const attrs = Array.from(labelByKey.entries())
      .map(([key, label]) => ({ key, label }))
      // Optional: control the order (color before size if both exist)
      .sort((a, b) => {
        const order = ['color', 'size'];
        return (order.indexOf(a.key) === -1 ? 99 : order.indexOf(a.key)) - (order.indexOf(b.key) === -1 ? 99 : order.indexOf(b.key));
      });

    return { normalizedVariants: nv, attributes: attrs };
  }, [product]);

  // Reset selections when product changes (optionally preselect the first available per attribute)
  useEffect(() => {
    if (!product) return;
    setSelectedOptions({});
  }, [product]);

  const getAvailableOptions = (attributeKey: string) => {
    if (!normalizedVariants.length) return [];

    // Only keep variants matching other selected options (normalized keys/values)
    const filtered = normalizedVariants.filter(v =>
      Object.entries(selectedOptions).every(([k, val]) => {
        if (k === attributeKey) return true;
        return v.__norm[k] === val;
      })
    );

    // Unique values for the current attribute + whether any matching variant has stock
    const options = new Map<string, boolean>(); // value -> isAvailable
    filtered.forEach(v => {
      const value = v.__norm[attributeKey];
      if (!value) return;
      const stockOk = (v.stockQuantity ?? 0) > 0;
      if (!options.has(value) || stockOk) options.set(value, stockOk);
    });

    return Array.from(options.entries()); // [value, isAvailable][]
  };

  const handleOptionSelect = (attributeKey: string, value: string) => {
    setSelectedOptions(prev => {
      const next = { ...prev };
      if (next[attributeKey] === value) {
        delete next[attributeKey]; // toggle off
      } else {
        next[attributeKey] = value;
        // Optionally: clear dependent selections if they become invalid
        // Object.keys(next).forEach(k => {
        //   if (k !== attributeKey) { /* add logic if needed */ }
        // });
      }
      return next;
    });
  };

  const currentVariant = useMemo(() => {
    if (!normalizedVariants.length) return undefined;
    if (Object.keys(selectedOptions).length !== attributes.length) return undefined;

    return normalizedVariants.find(v =>
      attributes.every(a => v.__norm[a.key] === selectedOptions[a.key])
    );
  }, [normalizedVariants, selectedOptions, attributes]);

  const handleAddToCartClick = () => {
    if (product && currentVariant) {
      if ((currentVariant.stockQuantity ?? 0) > 0) {
        // Strip the helper field before sending if your type is strict
        const { __norm, ...originalVariant } = currentVariant as any;
        onAddToCart(product, 1, originalVariant);
        onClose();
      } else {
        alert('This variant is out of stock.');
      }
    } else {
      alert('Please select all variant options.');
    }
  };

  const priceToShow = currentVariant?.price ?? product?.price ?? 0;
  const mrpToShow = product?.mrp ?? 0;
  const isAddToCartDisabled = !currentVariant;
  const imageToShow = currentVariant?.imageUrl || product?.imageUrl || '';

  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="quick-shop-title">
      <div className="modal-content w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-zaina-slate-gray p-1.5 rounded-full hover:bg-zaina-neutral-medium dark:hover:bg-dark-zaina-neutral-medium transition-colors"><CloseIcon className="w-5 h-5" /></button>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/3 flex-shrink-0">
            <img src={imageToShow} alt={product.name} className="w-full aspect-[3/4] object-cover rounded-md shadow-lg" />
          </div>
          <div className="flex-grow">
            <h2 id="quick-shop-title" className="text-xl font-heading-playfair font-semibold mb-1">{product.name}</h2>
            <div className="flex items-baseline mb-3">
              <p className="text-xl font-bold text-zaina-gold">₹{priceToShow.toFixed(2)}</p>
              {mrpToShow > priceToShow && (
                <span className="ml-2 text-sm text-zaina-text-secondary line-through">₹{mrpToShow.toFixed(2)}</span>
              )}
            </div>

            {attributes.map(({ key, label }) => {
              const options = getAvailableOptions(key);
              if (!options.length) return null;

              const selected = selectedOptions[key];

              return (
                <div key={key} className="mb-3">
                  <span className="text-sm font-semibold">{label}: <span className="font-normal">{selected || ''}</span></span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {options.map(([value, isAvailable]) => {
                      const isSelected = selected === value;
                      return (
                        <button
                          key={value}
                          onClick={() => handleOptionSelect(key, value)}
                          disabled={!isAvailable}
                          className={`relative px-3 py-1 text-xs font-medium rounded-md border-2 transition-all
                            ${isSelected ? 'bg-zaina-primary border-zaina-primary text-white' : 'border-zaina-neutral-medium bg-zaina-white dark:bg-dark-zaina-bg-card'}
                            ${!isAvailable ? 'text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed' : ''}`}
                        >
                          {value}
                          {!isAvailable && (
                            <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                              <div className="w-[80%] h-px bg-gray-400 transform rotate-[-20deg]" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <button
              onClick={handleAddToCartClick}
              disabled={isAddToCartDisabled}
              className="w-full bg-zaina-gold text-white font-semibold py-3 rounded-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isAddToCartDisabled ? 'Select Options' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickShopModal;
