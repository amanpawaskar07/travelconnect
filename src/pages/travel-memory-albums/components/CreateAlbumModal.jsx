import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CreateAlbumModal = ({ onClose, onAlbumCreated }) => {
  const [step, setStep] = useState(1); // 1: Basic Info, 2: Photos, 3: Settings
  const [albumData, setAlbumData] = useState({
    title: '',
    destination: '',
    description: '',
    category: 'adventure',
    isPublic: true,
    allowCollaborators: false,
    coverImage: null,
    photos: []
  });

  const categories = [
    { id: 'adventure', label: 'Adventure', icon: 'Mountain' },
    { id: 'nature', label: 'Nature', icon: 'Trees' },
    { id: 'culture', label: 'Culture', icon: 'Building' },
    { id: 'food', label: 'Food & Drink', icon: 'UtensilsCrossed' },
    { id: 'city', label: 'City', icon: 'Building2' },
    { id: 'beach', label: 'Beach', icon: 'Waves' }
  ];

  const handleInputChange = (field, value) => {
    setAlbumData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      caption: '',
      location: ''
    }));
    
    setAlbumData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos],
      coverImage: prev.coverImage || newPhotos[0]?.url
    }));
  };

  const handleRemovePhoto = (photoId) => {
    setAlbumData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== photoId)
    }));
  };

  const handleSetCover = (photoUrl) => {
    setAlbumData(prev => ({
      ...prev,
      coverImage: photoUrl
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCreate = () => {
    const newAlbum = {
      id: Date.now(),
      ...albumData,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      }),
      photoCount: albumData.photos.length,
      videoCount: 0,
      views: 0,
      likes: 0,
      comments: 0,
      collaborators: []
    };
    
    onAlbumCreated(newAlbum);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return albumData.title.trim() && albumData.destination.trim();
      case 2:
        return albumData.photos.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl shadow-soft-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-subtle">
          <div>
            <h2 className="font-heading font-bold text-xl text-text-primary">
              Create New Album
            </h2>
            <p className="font-body text-sm text-text-secondary mt-1">
              Step {step} of 3
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface rounded-full transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-subtle">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-200 ${
                  stepNumber <= step 
                    ? 'bg-primary text-white' :'bg-surface text-text-secondary'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-1 mx-2 rounded-full transition-colors duration-200 ${
                    stepNumber < step ? 'bg-primary' : 'bg-surface'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-primary font-semibold' : 'text-text-secondary'}>
              Basic Info
            </span>
            <span className={step >= 2 ? 'text-primary font-semibold' : 'text-text-secondary'}>
              Add Photos
            </span>
            <span className={step >= 3 ? 'text-primary font-semibold' : 'text-text-secondary'}>
              Settings
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block font-body font-semibold text-text-primary mb-2">
                  Album Title *
                </label>
                <input
                  type="text"
                  value={albumData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter album title..."
                  className="w-full px-4 py-3 border border-subtle rounded-xl bg-surface/50 font-body text-text-primary placeholder-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
              </div>

              <div>
                <label className="block font-body font-semibold text-text-primary mb-2">
                  Destination *
                </label>
                <input
                  type="text"
                  value={albumData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  placeholder="Where did you travel?"
                  className="w-full px-4 py-3 border border-subtle rounded-xl bg-surface/50 font-body text-text-primary placeholder-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
              </div>

              <div>
                <label className="block font-body font-semibold text-text-primary mb-2">
                  Description
                </label>
                <textarea
                  value={albumData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Tell us about your travel experience..."
                  rows={4}
                  className="w-full px-4 py-3 border border-subtle rounded-xl bg-surface/50 font-body text-text-primary placeholder-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                />
              </div>

              <div>
                <label className="block font-body font-semibold text-text-primary mb-3">
                  Category
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleInputChange('category', category.id)}
                      className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-200 ${
                        albumData.category === category.id
                          ? 'bg-primary/10 border-primary text-primary' :'bg-surface border-subtle text-text-secondary hover:border-primary/30 hover:bg-primary/5'
                      }`}
                    >
                      <Icon 
                        name={category.icon} 
                        size={24} 
                        className="mb-2"
                        strokeWidth={albumData.category === category.id ? 2.5 : 2}
                      />
                      <span className="font-caption text-sm">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Add Photos */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary/50 transition-colors duration-200">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Upload" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
                    Upload Photos
                  </h3>
                  <p className="font-body text-text-secondary">
                    Drag and drop photos here or click to browse
                  </p>
                </label>
              </div>

              {/* Photo Grid */}
              {albumData.photos.length > 0 && (
                <div>
                  <h4 className="font-body font-semibold text-text-primary mb-4">
                    Uploaded Photos ({albumData.photos.length})
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {albumData.photos.map((photo) => (
                      <div key={photo.id} className="relative group">
                        <div className="aspect-square rounded-xl overflow-hidden">
                          <Image
                            src={photo.url}
                            alt="Uploaded photo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSetCover(photo.url)}
                              className={`p-2 rounded-full transition-colors duration-200 ${
                                albumData.coverImage === photo.url
                                  ? 'bg-primary text-white' :'bg-white/20 text-white hover:bg-white/30'
                              }`}
                              title="Set as cover"
                            >
                              <Icon name="Star" size={16} />
                            </button>
                            <button
                              onClick={() => handleRemovePhoto(photo.id)}
                              className="p-2 bg-accent/80 hover:bg-accent text-white rounded-full transition-colors duration-200"
                              title="Remove photo"
                            >
                              <Icon name="Trash2" size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Cover Badge */}
                        {albumData.coverImage === photo.url && (
                          <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-caption">
                            Cover
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Settings */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-body font-semibold text-text-primary mb-4">
                  Privacy Settings
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-surface rounded-xl">
                    <div>
                      <h5 className="font-body font-semibold text-text-primary">Public Album</h5>
                      <p className="font-caption text-sm text-text-secondary">
                        Anyone can view and discover this album
                      </p>
                    </div>
                    <button
                      onClick={() => handleInputChange('isPublic', !albumData.isPublic)}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                        albumData.isPublic ? 'bg-primary' : 'bg-text-secondary/30'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                        albumData.isPublic ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-surface rounded-xl">
                    <div>
                      <h5 className="font-body font-semibold text-text-primary">Allow Collaborators</h5>
                      <p className="font-caption text-sm text-text-secondary">
                        Let friends add photos to this album
                      </p>
                    </div>
                    <button
                      onClick={() => handleInputChange('allowCollaborators', !albumData.allowCollaborators)}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                        albumData.allowCollaborators ? 'bg-primary' : 'bg-text-secondary/30'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                        albumData.allowCollaborators ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div>
                <h4 className="font-body font-semibold text-text-primary mb-4">
                  Album Preview
                </h4>
                <div className="bg-surface rounded-xl p-4 border border-subtle">
                  <div className="flex items-center space-x-4">
                    {albumData.coverImage && (
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={albumData.coverImage}
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h5 className="font-heading font-semibold text-text-primary line-clamp-1">
                        {albumData.title || 'Untitled Album'}
                      </h5>
                      <p className="font-body text-sm text-text-secondary line-clamp-1">
                        {albumData.destination || 'Unknown Destination'}
                      </p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-text-secondary">
                        <span>{albumData.photos.length} photos</span>
                        <span>{albumData.isPublic ? 'Public' : 'Private'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-subtle">
          <button
            onClick={step === 1 ? onClose : handlePrevious}
            className="px-6 py-2 text-text-secondary hover:text-text-primary font-body font-semibold transition-colors duration-200"
          >
            {step === 1 ? 'Cancel' : 'Previous'}
          </button>

          <div className="flex space-x-3">
            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`px-6 py-2 rounded-xl font-body font-semibold transition-all duration-200 ${
                  canProceed()
                    ? 'bg-primary hover:bg-primary-700 text-white shadow-soft hover-lift'
                    : 'bg-surface text-text-secondary cursor-not-allowed'
                }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleCreate}
                className="bg-primary hover:bg-primary-700 text-white px-6 py-2 rounded-xl font-body font-semibold transition-all duration-200 hover-lift shadow-soft"
              >
                Create Album
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAlbumModal;