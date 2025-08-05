
import React, { useState } from 'react';
import { HeroSlide, MediaFile } from '../../../types';
import InputField from '../../shared/InputField';
import PlusCircleIcon from '../../icons/PlusCircleIcon';
import EditIcon from '../../icons/EditIcon';
import TrashIcon from '../../icons/TrashIcon';
import MediaManagerModal from './MediaManagerModal';

interface AdminHeroSliderSectionProps {
  slides: HeroSlide[];
  onSave: (slide: HeroSlide) => void;
  onDelete: (slideId: string) => void;
  mediaLibrary: MediaFile[];
  onUploadMedia: (files: File[]) => void;
}

const primaryButtonSmClasses = "bg-admin-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-admin-accent-hover transition-colors";
const secondaryButtonSmClasses = "bg-gray-200 dark:bg-gray-600 text-admin-text dark:text-admin-dark-text font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors";

const AdminHeroSliderSection: React.FC<AdminHeroSliderSectionProps> = ({ slides, onSave, onDelete, mediaLibrary, onUploadMedia }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [formData, setFormData] = useState<Partial<HeroSlide>>({});
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: name === 'order' ? Number(val) : val }));
  };

  const resetForm = () => {
    setFormData({});
    setIsFormVisible(false);
    setEditingSlide(null);
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData(slide);
    setIsFormVisible(true);
  };

  const handleAddNew = () => {
    setEditingSlide(null);
    setFormData({ id: `slide_${Date.now()}`, isActive: true, order: (slides?.length || 0) + 1 });
    setIsFormVisible(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      alert("Image URL is required for a slide.");
      return;
    }
    onSave(formData as HeroSlide);
    resetForm();
  };

  const handleSelectImage = (selectedUrls: string[]) => {
    if (selectedUrls.length > 0) {
      setFormData(prev => ({ ...prev, imageUrl: selectedUrls[0] }));
    }
    setIsMediaModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold font-heading-playfair text-admin-text dark:text-admin-dark-text">Homepage Sliders</h2>
        {!isFormVisible && (
          <button onClick={handleAddNew} className={`${primaryButtonSmClasses} flex items-center`}>
            <PlusCircleIcon className="w-4 h-4 mr-2" /> Add New Slide
          </button>
        )}
      </div>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-admin-light dark:bg-admin-dark rounded-lg shadow-inner space-y-4">
          <h3 className="text-lg font-semibold">{editingSlide ? `Editing: ${editingSlide.title}` : 'Add New Slide'}</h3>
          <InputField label="Title" name="title" value={formData.title || ''} onChange={handleInputChange} />
          <InputField label="Caption / Subtitle" name="caption" value={formData.caption || ''} onChange={handleInputChange} />
          <div className="flex items-end gap-3">
            <InputField label="Image URL" name="imageUrl" value={formData.imageUrl || ''} onChange={handleInputChange} required />
            <button type="button" onClick={() => setIsMediaModalOpen(true)} className={`${secondaryButtonSmClasses} h-[46px]`}>Choose Image</button>
            {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="w-20 h-auto rounded-md border"/>}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <InputField label="CTA Button Text" name="ctaText" value={formData.ctaText || ''} onChange={handleInputChange} />
            <InputField label="CTA Link" name="ctaLink" value={formData.ctaLink || ''} onChange={handleInputChange} placeholder="e.g., /shop or #new-arrivals" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <InputField label="Order" name="order" type="number" value={formData.order || ''} onChange={handleInputChange} />
            <div className="flex items-center pt-6">
              <input type="checkbox" id="isActive" name="isActive" checked={!!formData.isActive} onChange={handleInputChange} className="h-4 w-4 rounded text-admin-accent"/>
              <label htmlFor="isActive" className="ml-2 text-sm font-medium">Active</label>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className={primaryButtonSmClasses}>{editingSlide ? 'Update Slide' : 'Save Slide'}</button>
            <button type="button" onClick={resetForm} className={secondaryButtonSmClasses}>Cancel</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto bg-admin-light-card dark:bg-admin-dark-card p-4 rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-admin-text-secondary uppercase">Order</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-admin-text-secondary uppercase">Image</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-admin-text-secondary uppercase">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-admin-text-secondary uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-admin-text-secondary uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {slides.sort((a,b) => a.order - b.order).map(slide => (
              <tr key={slide.id}>
                <td className="px-4 py-3 text-sm">{slide.order}</td>
                <td className="px-4 py-3"><img src={slide.imageUrl} alt={slide.title} className="w-24 h-12 object-cover rounded-md"/></td>
                <td className="px-4 py-3 text-sm font-medium">{slide.title}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${slide.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {slide.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm space-x-2">
                  <button onClick={() => handleEdit(slide)} className="text-admin-accent hover:underline p-1"><EditIcon className="w-4 h-4"/></button>
                  <button onClick={() => onDelete(slide.id)} className="text-red-500 hover:underline p-1"><TrashIcon className="w-4 h-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MediaManagerModal isOpen={isMediaModalOpen} onClose={() => setIsMediaModalOpen(false)} mediaLibrary={mediaLibrary} onSelect={handleSelectImage} onUpload={onUploadMedia} filter="image" />
    </div>
  );
};

export default AdminHeroSliderSection;
