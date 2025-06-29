import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import AlbumGrid from './components/AlbumGrid';
import AlbumViewer from './components/AlbumViewer';
import CreateAlbumModal from './components/CreateAlbumModal';
import AlbumSidebar from './components/AlbumSidebar';

const TravelMemoryAlbums = () => {
  const navigate = useNavigate();
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Mock data for albums
  const mockAlbums = [
    {
      id: 1,
      title: "Tokyo Adventures",
      destination: "Tokyo, Japan",
      date: "March 2024",
      coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      photoCount: 127,
      videoCount: 8,
      views: 1245,
      likes: 89,
      comments: 23,
      isPublic: true,
      category: "adventure",
      collaborators: [
        { id: 1, name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
        { id: 2, name: "Mike Johnson", avatar: "https://randomuser.me/api/portraits/men/45.jpg" }
      ],
      memories: [
        {
          id: 1,
          type: "photo",
          url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
          caption: "First glimpse of Tokyo\'s skyline from our hotel room. The city lights were absolutely mesmerizing!",
          location: "Shibuya, Tokyo",
          date: "2024-03-15T08:30:00Z",
          likes: 45,
          tags: ["skyline", "cityscape", "hotel"]
        },
        {
          id: 2,
          type: "photo",
          url: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop",
          caption: "Traditional sushi breakfast at Tsukiji Market. Every bite was a perfect balance of flavors.",
          location: "Tsukiji Market, Tokyo",
          date: "2024-03-16T06:00:00Z",
          likes: 67,
          tags: ["food", "sushi", "market", "traditional"]
        }
      ]
    },
    {
      id: 2,
      title: "Bali Sunset Vibes",
      destination: "Bali, Indonesia",
      date: "February 2024",
      coverImage: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
      photoCount: 89,
      videoCount: 12,
      views: 892,
      likes: 156,
      comments: 34,
      isPublic: true,
      category: "nature",
      collaborators: [],
      memories: []
    },
    {
      id: 3,
      title: "European Road Trip",
      destination: "Multiple Cities",
      date: "January 2024",
      coverImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop",
      photoCount: 234,
      videoCount: 15,
      views: 2156,
      likes: 203,
      comments: 67,
      isPublic: false,
      category: "adventure",
      collaborators: [
        { id: 3, name: "Emma Wilson", avatar: "https://randomuser.me/api/portraits/women/28.jpg" }
      ],
      memories: []
    },
    {
      id: 4,
      title: "Mountain Hiking",
      destination: "Swiss Alps",
      date: "December 2023",
      coverImage: "https://images.unsplash.com/photo-1464822759844-d150baec93d5?w=800&h=600&fit=crop",
      photoCount: 67,
      videoCount: 5,
      views: 567,
      likes: 78,
      comments: 12,
      isPublic: true,
      category: "nature",
      collaborators: [],
      memories: []
    },
    {
      id: 5,
      title: "Cultural Heritage Tour",
      destination: "India",
      date: "November 2023",
      coverImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
      photoCount: 156,
      videoCount: 9,
      views: 1334,
      likes: 134,
      comments: 45,
      isPublic: true,
      category: "culture",
      collaborators: [],
      memories: []
    },
    {
      id: 6,
      title: "Beach Paradise",
      destination: "Maldives",
      date: "October 2023",
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      photoCount: 98,
      videoCount: 7,
      views: 1876,
      likes: 234,
      comments: 56,
      isPublic: true,
      category: "nature",
      collaborators: [],
      memories: []
    }
  ];

  const categories = [
    { id: 'all', label: 'All Albums', icon: 'Grid3X3', count: mockAlbums.length },
    { id: 'adventure', label: 'Adventure', icon: 'Mountain', count: mockAlbums.filter(a => a.category === 'adventure').length },
    { id: 'nature', label: 'Nature', icon: 'Trees', count: mockAlbums.filter(a => a.category === 'nature').length },
    { id: 'culture', label: 'Culture', icon: 'Building', count: mockAlbums.filter(a => a.category === 'culture').length },
    { id: 'food', label: 'Food', icon: 'UtensilsCrossed', count: mockAlbums.filter(a => a.category === 'food').length }
  ];

  const totalStats = {
    totalAlbums: mockAlbums.length,
    totalPhotos: mockAlbums.reduce((sum, album) => sum + album.photoCount, 0),
    totalVideos: mockAlbums.reduce((sum, album) => sum + album.videoCount, 0),
    totalViews: mockAlbums.reduce((sum, album) => sum + album.views, 0)
  };

  const filteredAlbums = mockAlbums.filter(album => {
    const matchesCategory = selectedCategory === 'all' || album.category === selectedCategory;
    const matchesSearch = album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         album.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
  };

  const handleCloseViewer = () => {
    setSelectedAlbum(null);
  };

  const handleCreateAlbum = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleAlbumCreated = (newAlbum) => {
    console.log('New album created:', newAlbum);
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="font-heading font-bold text-3xl lg:text-4xl text-text-primary mb-2">
                Travel Memory Albums
              </h1>
              <p className="font-body text-text-secondary text-lg">
                Curate and share your travel experiences through beautiful collections
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              {/* View Mode Toggle */}
              <div className="hidden lg:flex items-center bg-surface rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid' ?'bg-primary text-white shadow-soft' :'text-text-secondary hover:text-primary'
                  }`}
                >
                  <Icon name="Grid3X3" size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list' ?'bg-primary text-white shadow-soft' :'text-text-secondary hover:text-primary'
                  }`}
                >
                  <Icon name="List" size={18} />
                </button>
              </div>

              {/* Create Album Button */}
              <button
                onClick={handleCreateAlbum}
                className="flex items-center space-x-2 bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-body font-semibold transition-all duration-200 hover-lift shadow-soft"
              >
                <Icon name="Plus" size={20} strokeWidth={2.5} />
                <span className="hidden sm:inline">Create Album</span>
              </button>
            </div>
          </div>

          {/* Stats Cards - Mobile */}
          <div className="grid grid-cols-2 lg:hidden gap-4 mb-6">
            <div className="bg-surface rounded-xl p-4 border border-subtle">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FolderOpen" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-heading font-bold text-xl text-text-primary">{totalStats.totalAlbums}</p>
                  <p className="font-caption text-sm text-text-secondary">Albums</p>
                </div>
              </div>
            </div>
            <div className="bg-surface rounded-xl p-4 border border-subtle">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Camera" size={20} className="text-secondary-600" />
                </div>
                <div>
                  <p className="font-heading font-bold text-xl text-text-primary">{totalStats.totalPhotos}</p>
                  <p className="font-caption text-sm text-text-secondary">Photos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={20} className="text-text-secondary" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search albums by title or destination..."
              className="block w-full pl-10 pr-4 py-3 border border-subtle rounded-xl bg-surface/50 backdrop-blur-sm font-body text-sm
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                placeholder-text-secondary/70 transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <AlbumSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              totalStats={totalStats}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Category Filter - Mobile */}
            <div className="lg:hidden mb-6">
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full border whitespace-nowrap transition-all duration-200 flex-shrink-0
                      ${selectedCategory === category.id
                        ? 'bg-primary text-white border-primary shadow-soft'
                        : 'bg-surface hover:bg-primary-50 text-text-primary border-subtle'
                      }`}
                  >
                    <Icon 
                      name={category.icon} 
                      size={16} 
                      strokeWidth={selectedCategory === category.id ? 2.5 : 2}
                    />
                    <span className="font-body text-sm">{category.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === category.id 
                        ? 'bg-white/20 text-white' :'bg-text-secondary/10 text-text-secondary'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Albums Grid */}
            <AlbumGrid
              albums={filteredAlbums}
              viewMode={viewMode}
              onAlbumClick={handleAlbumClick}
              onCreateAlbum={handleCreateAlbum}
            />

            {/* Empty State */}
            {filteredAlbums.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Camera" size={48} className="text-text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-text-primary mb-2">
                  No albums found
                </h3>
                <p className="font-body text-text-secondary mb-6 max-w-md mx-auto">
                  {searchQuery 
                    ? `No albums match your search for "${searchQuery}"`
                    : "Start creating your first travel memory album to capture your adventures"
                  }
                </p>
                <button
                  onClick={handleCreateAlbum}
                  className="bg-primary hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-body font-semibold transition-all duration-200 hover-lift shadow-soft"
                >
                  Create Your First Album
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Album Viewer Modal */}
      {selectedAlbum && (
        <AlbumViewer
          album={selectedAlbum}
          onClose={handleCloseViewer}
        />
      )}

      {/* Create Album Modal */}
      {showCreateModal && (
        <CreateAlbumModal
          onClose={handleCloseCreateModal}
          onAlbumCreated={handleAlbumCreated}
        />
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TravelMemoryAlbums;