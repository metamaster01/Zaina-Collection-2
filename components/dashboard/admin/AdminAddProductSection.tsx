

import React, { useState, useEffect } from 'react';
import { Product, MediaFile, ProductVariant, VariantAttribute, Category } from '../../../types';
import InputField from '../../shared/InputField';
import TagInput from '../../shared/TagInput';
import ProductImageManager from './ProductImageManager';
import MediaManagerModal from './MediaManagerModal';
import TrashIcon from '../../icons/TrashIcon';
import CreateVariantModal from './CreateVariantModal';

interface AdminAddProductSectionProps {
  products: Product[];
  onSave: (product: Product) => void;
  onCancel: () => void;
  productToEdit: Product | null;
  onUploadMedia: (files: File[]) => void;
  mediaLibrary: MediaFile[];
  variantAttributes: VariantAttribute[];
  categories: Category[];
}

const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const AdminAddProductSection: React.FC<AdminAddProductSectionProps> = ({ products, onSave, onCancel, productToEdit, onUploadMedia, mediaLibrary, variantAttributes, categories }) => {
    const isEditing = !!productToEdit;
    
    const [product, setProduct] = useState<Partial<Product>>({});
    const [variants, setVariants] = useState<ProductVariant[]>([]);
    
    const [nameError, setNameError] = useState('');
    const [skuError, setSkuError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [variantErrors, setVariantErrors] = useState<Record<number, string>>({});
    
    const [selectedCategoryName, setSelectedCategoryName] = useState('');
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
    const [isMediaModalOpenForBanner, setIsMediaModalOpenForBanner] = useState(false);
    const [editingVariantIndex, setEditingVariantIndex] = useState<number | null>(null);
    
    const colorAttribute = variantAttributes.find(a => a.name.toLowerCase() === 'color');
    const sizeAttribute = variantAttributes.find(a => a.name.toLowerCase() === 'size');
    
    useEffect(() => {
        if (isEditing) {
            setProduct(productToEdit);
            setVariants(productToEdit.variants || []);
            setIsSlugManuallyEdited(true);
            setSelectedCategoryName(productToEdit.category);
        } else {
            // Set defaults for a new product
            setProduct({
                id: `prod_${Date.now()}`,
                publishStatus: 'Published',
                isTaxable: true,
                isNew: true,
                gender: 'Female',
                tags: [],
                specifications: [{ key: '', value: '' }],
                images: [],
                faqs: [],
            });
            setVariants([]);
             setIsSlugManuallyEdited(false);
        }
    }, [productToEdit, isEditing]);

    const validatePrice = (price?: number, mrp?: number) => {
        if (price !== undefined && mrp !== undefined && price > mrp) {
            return `Selling price cannot be greater than MRP (₹${mrp}).`;
        }
        return '';
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let val: any;

        if (type === 'checkbox') {
            val = (e.target as HTMLInputElement).checked;
        } else if (name === 'price' || name === 'mrp' || name === 'stockQuantity') {
            const num = parseFloat(value);
            val = isNaN(num) ? undefined : num;
        } else {
            val = value;
        }
        
        let newProductState = { ...product, [name]: val };
        
        if (name === 'price') {
            setPriceError(validatePrice(val, newProductState.mrp));
        }
        if (name === 'mrp') {
            setPriceError(validatePrice(newProductState.price, val));
        }

        if (name === 'name') {
            if (!isSlugManuallyEdited) {
                newProductState.slug = generateSlug(value);
            }
            const similarProduct = products.find(p => p.id !== productToEdit?.id && p.name.toLowerCase().includes(value.toLowerCase()));
            setNameError(similarProduct ? `Similar product exists: "${similarProduct.name}"` : '');
        }
        if (name === 'sku' && value) {
            const duplicateSku = products.find(p => p.id !== productToEdit?.id && p.sku === value);
            setSkuError(duplicateSku ? `SKU already exists for product: "${duplicateSku.name}"` : '');
        }
        
        setProduct(newProductState);
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsSlugManuallyEdited(true);
        setProduct({ ...product, slug: generateSlug(e.target.value) });
    };

    const handleVariantChange = (index: number, field: keyof Omit<ProductVariant, 'attributes'>, value: string | number) => {
        const newVariants = [...variants];
        let finalValue: any = value;
        if (field === 'price' || field === 'stockQuantity') {
            const num = parseFloat(value as string);
            finalValue = isNaN(num) ? undefined : num;
        }
        (newVariants[index] as any)[field] = finalValue;

        if (field === 'price') {
            const error = validatePrice(finalValue as number, product.mrp);
            setVariantErrors(prev => ({ ...prev, [index]: error }));
        }

        setVariants(newVariants);
    };
    
    const handleAttributeChange = (index: number, attrName: string, value: string) => {
        const newVariants = [...variants];
        newVariants[index].attributes[attrName] = value;
        setVariants(newVariants);
    }

    const handleGenerateVariants = (newVariants: ProductVariant[]) => {
        setVariants(prevVariants => {
            const existingVariantKeys = new Set(prevVariants.map(v => `${v.attributes['Color']}-${v.attributes['Size']}`));
            const variantsToAdd = newVariants.filter(nv => !existingVariantKeys.has(`${nv.attributes['Color']}-${nv.attributes['Size']}`));

            if (variantsToAdd.length < newVariants.length) {
                alert('Some variant combinations already existed and were not added to prevent duplicates.');
            }

            return [...prevVariants, ...variantsToAdd];
        });
    };

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
        setVariantErrors(prev => {
            const newErrors = {...prev};
            delete newErrors[index];
            return newErrors;
        });
    };

    const handleSpecsChange = (index: number, field: 'key' | 'value', value: string) => {
        const newSpecs = [...(product.specifications || [])];
        newSpecs[index][field] = value;
        setProduct({ ...product, specifications: newSpecs });
    };

    const addSpecField = () => {
        setProduct({ ...product, specifications: [...(product.specifications || []), { key: '', value: '' }] });
    };

    const removeSpecField = (index: number) => {
        const newSpecs = (product.specifications || []).filter((_, i) => i !== index);
        setProduct({ ...product, specifications: newSpecs });
    };

    const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
        const newFaqs = [...(product.faqs || [])];
        newFaqs[index][field] = value;
        setProduct({ ...product, faqs: newFaqs });
    };

    const addFaqField = () => {
        setProduct({ ...product, faqs: [...(product.faqs || []), { question: '', answer: '' }] });
    };

    const removeFaqField = (index: number) => {
        const newFaqs = (product.faqs || []).filter((_, i) => i !== index);
        setProduct({ ...product, faqs: newFaqs });
    };

    const handleImageChange = (urls: string[]) => {
        setProduct(prev => ({
            ...prev,
            imageUrl: urls[0] || '', // Primary image is the first one
            images: urls.slice(1), // The rest are gallery images
        }));
    };
    
    const handleSelectVariantImage = (index: number) => {
        setEditingVariantIndex(index);
        setIsMediaModalOpen(true);
    };

    const onSelectImageForVariant = (selectedUrls: string[]) => {
        if (editingVariantIndex !== null && selectedUrls.length > 0) {
            handleVariantChange(editingVariantIndex, 'imageUrl', selectedUrls[0]);
        }
        setIsMediaModalOpen(false);
        setEditingVariantIndex(null);
    };

    const onSelectImageForBanner = (selectedUrls: string[]) => {
        if (selectedUrls.length > 0) {
            setProduct(prev => ({ ...prev, bannerImageUrl: selectedUrls[0] }));
        }
        setIsMediaModalOpenForBanner(false);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!product.name || product.price === undefined || !product.category || !product.sku || product.mrp === undefined) {
            alert('Please fill all required fields: Name, Selling Price, Product MRP, Category, and SKU.');
            return;
        }
        if (skuError || priceError || Object.values(variantErrors).some(e => e)) {
            alert('Please fix all errors before saving.');
            return;
        }
        console.log(product)
        
        onSave({...product, variants} as Product);
    };
    
    const selectedCategoryObject = categories.find(c => c.name === product.category);


    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            <h2 className="text-xl font-semibold font-heading-playfair text-admin-text dark:text-admin-dark-text">
                {isEditing ? `Editing: ${productToEdit.name}` : 'Add New Product'}
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left/Main Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <div className="bg-admin-card dark:bg-dark-admin-card p-6 rounded-2xl shadow-admin-soft">
                        <h3 className="text-lg font-semibold text-admin-text-primary dark:text-dark-admin-text-primary mb-4">Basic Information</h3>
                        <div className="space-y-4">
                            <InputField label="Product Name" name="name" value={product.name || ''} onChange={handleInputChange} required maxLength={80} error={nameError} />
                            <InputField label="Product Slug" name="slug" value={product.slug || ''} onChange={handleSlugChange} helperText="URL-friendly version of the name." />
                             <div className="grid md:grid-cols-2 gap-4">
                                <InputField label="Category" name="category" value={product.category || ''} as="select" onChange={handleInputChange} required>
                                     <option value="">Select Category</option>
                                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </InputField>
                                <InputField label="Sub Category" name="subCategory" value={product.subCategory || ''} as="select" onChange={handleInputChange}>
                                     <option value="">Select Sub Category</option>
                                    {selectedCategoryObject?.subCategories.map(sc => <option key={sc.id} value={sc.name}>{sc.name}</option>)}
                                </InputField>
                            </div>
                        </div>
                    </div>
                    {/* Description */}
                    <div className="bg-admin-card dark:bg-dark-admin-card p-6 rounded-2xl shadow-admin-soft">
                        <h3 className="text-lg font-semibold text-admin-text-primary dark:text-dark-admin-text-primary mb-4">Short Description</h3>
                        <InputField 
                            as="textarea"
                            label=""
                            name="description"
                            value={product.description || ''}
                            onChange={handleInputChange}
                            rows={4}
                            maxLength={500}
                        />
                        <p className="text-xs text-right text-gray-400">{(product.description || '').length}/500</p>
                    </div>
                    {/* Detailed Description */}
                    <div className="bg-admin-card dark:bg-dark-admin-card p-6 rounded-2xl shadow-admin-soft">
                        <h3 className="text-lg font-semibold text-admin-text-primary dark:text-dark-admin-text-primary mb-4">Detailed Description (HTML Supported)</h3>
                        <InputField 
                            as="textarea"
                            label=""
                            name="longDescriptionHtml"
                            value={product.longDescriptionHtml || ''}
                            onChange={handleInputChange}
                            rows={10}
                            placeholder="Enter detailed product description using HTML for formatting..."
                        />
                    </div>
                     {/* Images */}
                     <div className="bg-admin-card dark:bg-dark-admin-card p-6 rounded-2xl shadow-admin-soft">
                        <h3 className="text-lg font-semibold text-admin-text-primary dark:text-dark-admin-text-primary mb-4">Default Product Images</h3>
                        <ProductImageManager
                            initialImageUrls={[product.imageUrl, ...(product.images || [])].filter(Boolean) as string[]}
                            onImageChange={handleImageChange}
                            onUploadMedia={onUploadMedia}
                            mediaLibrary={mediaLibrary}
                        />
                    </div>
                    {/* Variants */}
                    <div className="bg-admin-card dark:bg-dark-admin-card p-6 rounded-2xl shadow-admin-soft">
                        <h3 className="text-lg font-semibold text-admin-text-primary dark:text-dark-admin-text-primary mb-4">Variants</h3>
                        <div className="space-y-4">
                            {variants.map((variant, index) => (
                                <div key={index} className="p-4 border rounded-lg bg-admin-light dark:bg-admin-dark space-y-3">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">Variant {index + 1}</p>
                                        <button type="button" onClick={() => removeVariant(index)} className="text-red-500"><TrashIcon className="w-4 h-4" /></button>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        <InputField as="select" label="Color" name="color" value={variant.attributes['Color'] || ''} onChange={e => handleAttributeChange(index, 'Color', e.target.value)}>
                                            <option value="">Select Color</option>
                                            {colorAttribute?.values.map(c => <option key={c} value={c}>{c}</option>)}
                                        </InputField>
                                        <InputField as="select" label="Size" name="size" value={variant.attributes['Size'] || ''} onChange={e => handleAttributeChange(index, 'Size', e.target.value)}>
                                            <option value="">Select Size</option>
                                            {sizeAttribute?.values.map(s => <option key={s} value={s}>{s}</option>)}
                                        </InputField>
                                        <InputField label="Variant SKU" name="sku" value={variant.sku} onChange={e => handleVariantChange(index, 'sku', e.target.value)} />
                                        <InputField label="Selling Price" name="price" type="number" value={variant.price ?? ''} onChange={e => handleVariantChange(index, 'price', e.target.value)} error={variantErrors[index]}/>
                                        <InputField label="Stock" name="stockQuantity" type="number" value={variant.stockQuantity ?? ''} onChange={e => handleVariantChange(index, 'stockQuantity', e.target.value)} />
                                        <div className="flex items-end col-span-2 md:col-span-1">
                                             <button type="button" onClick={() => handleSelectVariantImage(index)} className="w-full text-sm bg-gray-200 dark:bg-gray-600 h-[46px] rounded-md hover:bg-gray-300 dark:hover:bg-gray-500">
                                                {variant.imageUrl ? 'Change Image' : 'Select Image'}
                                            </button>
                                            {variant.imageUrl && <img src={variant.imageUrl} alt="variant" className="w-10 h-10 ml-2 rounded object-cover"/>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => setIsVariantModalOpen(true)} className="text-sm mt-3 text-admin-accent hover:underline">+ Generate Variants from Attributes</button>
                    </div>

                     {/* Specifications */}
                    <div className="bg-admin-card dark:bg-dark-admin-card p-6 rounded-2xl shadow-admin-soft">
                        <h3 className="text-lg font-semibold text-admin-text-primary dark:text-dark-admin-text-primary mb-4">Specifications</h3>
                        <div className="space-y-2">
                        {(product.specifications || []).map((spec, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input type="text" placeholder="Key (e.g., Fabric)" value={spec.key} onChange={e => handleSpecsChange(index, 'key', e.target.value)} className="w-full text-sm p-2 border rounded-md dark:bg-admin-dark border-gray-300 dark:border-gray-600"/>
                                <input type="text" placeholder="Value (e.g., Cotton)" value={spec.value} onChange={e => handleSpecsChange(index, 'value', e.target.value)} className="w-full text-sm p-2 border rounded-md dark:bg-admin-dark border-gray-300 dark:border-gray-600"/>
                                <button type="button" onClick={() => removeSpecField(index)} className="text-red-500 p-2 h-[42px] hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"><TrashIcon className="w-4 h-4" /></button>
                            </div>
                        ))}
                        </div>
                        <button type="button" onClick={addSpecField} className="text-sm mt-3 text-admin-accent hover:underline">+ Add More</button>
                    </div>
                     {/* FAQs */}
                    <div className="bg-admin-card dark:bg-dark-admin-card p-6 rounded-2xl shadow-admin-soft">
                        <h3 className="text-lg font-semibold text-admin-text-primary dark:text-dark-admin-text-primary mb-4">Product FAQs</h3>
                        <div className="space-y-3">
                        {(product.faqs || []).map((faq, index) => (
                            <div key={index} className="flex flex-col md:flex-row items-start gap-2 p-3 border rounded-md bg-admin-light dark:bg-admin-dark">
                                <InputField as="textarea" label={`Q${index + 1}`} name={`question-${index}`} value={faq.question} onChange={e => handleFaqChange(index, 'question', e.target.value)} placeholder="Question" className="flex-1"/>
                                <InputField as="textarea" label={`A${index + 1}`} name={`answer-${index}`} value={faq.answer} onChange={e => handleFaqChange(index, 'answer', e.target.value)} placeholder="Answer" className="flex-1"/>
                                <button type="button" onClick={() => removeFaqField(index)} className="text-red-500 mt-auto md:mt-7 h-10 w-10 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"><TrashIcon className="w-4 h-4" /></button>
                            </div>
                        ))}
                        </div>
                        <button type="button" onClick={addFaqField} className="text-sm mt-3 text-admin-accent hover:underline">+ Add FAQ</button>
                    </div>
                </div>
                {/* Right Column */}
                <div className="lg:col-span-1 space-y-8">
                     <div className="bg-admin-card dark:bg-dark-admin-card p-6 rounded-2xl shadow-admin-soft">
                        <h3 className="text-lg font-semibold text-admin-text-primary dark:text-dark-admin-text-primary mb-4">Pricing & Stock</h3>
                         <div className="space-y-4">
                            <InputField label="Product MRP" name="mrp" type="number" value={product.mrp ?? ''} onChange={handleInputChange} required helperText="Maximum Retail Price. Same for all variants."/>
                            <InputField label="Selling Price (fallback)" name="price" type="number" value={product.price ?? ''} onChange={handleInputChange} required helperText="Used if no variants exist." error={priceError}/>
                            <InputField label="Base SKU" name="sku" value={product.sku || ''} onChange={handleInputChange} required error={skuError} helperText="Base SKU for the product."/>
                            <InputField label="Base Stock" name="stockQuantity" type="number" value={product.stockQuantity ?? ''} onChange={handleInputChange} helperText="Used if no variants exist."/>
                         </div>
                    </div>
                     <div className="bg-admin-card dark:bg-dark-admin-card p-6 rounded-2xl shadow-admin-soft">
                        <h3 className="text-lg font-semibold text-admin-text-primary dark:text-dark-admin-text-primary mb-4">Organization</h3>
                         <div className="space-y-4">
                            <TagInput tags={product.tags || []} setTags={newTags => setProduct({...product, tags: newTags})} placeholder="Add collections/tags..." label="Tags/Collections"/>
                             <div>
                                <label className="block text-sm font-medium text-admin-text-primary dark:text-dark-admin-text-primary mb-1.5">Publish Status</label>
                                <select name="publishStatus" value={product.publishStatus} onChange={handleInputChange} className="w-full px-3 py-2.5 border rounded-lg shadow-sm bg-admin-light-card dark:bg-admin-dark-card border-gray-300 dark:border-gray-600 focus:ring-1 focus:ring-admin-accent focus:border-admin-accent">
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Hidden">Hidden</option>
                                </select>
                            </div>
                             <div className="flex flex-col gap-2 pt-2">
                                <label className="flex items-center text-sm">
                                    <input type="checkbox" name="isNew" checked={product.isNew || false} onChange={handleInputChange} className="h-4 w-4 rounded text-admin-accent focus:ring-admin-accent"/>
                                    <span className="ml-2">Mark as New Arrival</span>
                                </label>
                                 <label className="flex items-center text-sm">
                                    <input type="checkbox" name="isBestSeller" checked={product.isBestSeller || false} onChange={handleInputChange} className="h-4 w-4 rounded text-admin-accent focus:ring-admin-accent"/>
                                    <span className="ml-2">Mark as Best Seller</span>
                                </label>
                             </div>
                        </div>
                    </div>
                     <div className="bg-admin-card dark:bg-dark-admin-card p-6 rounded-2xl shadow-admin-soft">
                        <h3 className="text-lg font-semibold text-admin-text-primary dark:text-dark-admin-text-primary mb-4">Promotional Banner</h3>
                        <div className="space-y-4">
                           <div>
                                <label className="block text-sm font-medium text-admin-text dark:text-admin-dark-text mb-1.5">Banner Image</label>
                                <div className="flex items-center gap-4">
                                    {product.bannerImageUrl ? (
                                        <img src={product.bannerImageUrl} alt="Banner preview" className="w-48 h-auto max-h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"/>
                                    ) : (
                                        <div className="w-48 h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center bg-admin-light dark:bg-admin-dark">
                                            <p className="text-xs text-gray-500">No Image Selected</p>
                                        </div>
                                    )}
                                    <button type="button" onClick={() => setIsMediaModalOpenForBanner(true)} className="self-end bg-gray-200 dark:bg-gray-600 text-admin-text dark:text-admin-dark-text font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500">
                                        {product.bannerImageUrl ? 'Change Image' : 'Select Image'}
                                    </button>
                                </div>
                            </div>
                            <InputField label="Banner Link URL" name="bannerLink" value={product.bannerLink || ''} onChange={handleInputChange} placeholder="e.g., /shop/sale" />
                        </div>
                    </div>
                    <div className="bg-admin-card dark:bg-dark-admin-card p-6 rounded-2xl shadow-admin-soft">
                        <h3 className="text-lg font-semibold text-admin-text-primary dark:text-dark-admin-text-primary mb-4">SEO</h3>
                         <div className="space-y-4">
                            <InputField label="Meta Title" name="metaTitle" value={product.metaTitle || ''} onChange={handleInputChange} />
                            <InputField
                                as="textarea"
                                label="Meta Description"
                                name="metaDescription"
                                value={product.metaDescription || ''}
                                onChange={handleInputChange}
                                rows={4}
                                placeholder="Meta Description"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white/80 dark:bg-admin-dark-card/80 backdrop-blur-sm p-4 border-t border-gray-200 dark:border-gray-700 shadow-top-strong flex justify-end items-center gap-4 z-40">
                <button type="button" onClick={onCancel} className="text-sm font-semibold text-admin-text dark:text-admin-dark-text hover:underline">Cancel</button>
                <button type="button" onClick={() => alert("Preview functionality to be implemented.")} className="bg-gray-200 dark:bg-gray-600 text-admin-text dark:text-admin-dark-text font-semibold py-2 px-5 rounded-lg hover:opacity-80 transition">
                    Preview
                </button>
                <button type="submit" className="bg-admin-accent text-white font-semibold py-2 px-6 rounded-lg hover:bg-admin-accent-hover transition">
                    {isEditing ? 'Update Product' : 'Save Product'}
                </button>
            </div>
            <MediaManagerModal
                isOpen={isMediaModalOpen}
                onClose={() => setIsMediaModalOpen(false)}
                mediaLibrary={mediaLibrary}
                onSelect={onSelectImageForVariant}
                onUpload={onUploadMedia}
            />
             <MediaManagerModal
                isOpen={isMediaModalOpenForBanner}
                onClose={() => setIsMediaModalOpenForBanner(false)}
                mediaLibrary={mediaLibrary}
                onSelect={onSelectImageForBanner}
                onUpload={onUploadMedia}
            />
            <CreateVariantModal
                isOpen={isVariantModalOpen}
                onClose={() => setIsVariantModalOpen(false)}
                onGenerate={handleGenerateVariants}
                baseSku={product.sku}
                basePrice={product.price}
                attributes={variantAttributes}
            />
        </form>
    )
}

export default AdminAddProductSection;