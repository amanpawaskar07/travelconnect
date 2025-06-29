import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SearchBar = ({ searchQuery, onSearch, onVoiceSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef(null);

  const suggestions = [
    { type: 'destination', text: 'Santorini, Greece', icon: 'MapPin' },
    { type: 'destination', text: 'Kyoto, Japan', icon: 'MapPin' },
    { type: 'destination', text: 'Bali, Indonesia', icon: 'MapPin' },
    { type: 'activity', text: 'Beach destinations', icon: 'Waves' },
    { type: 'activity', text: 'Mountain hiking', icon: 'Mountain' },
    { type: 'activity', text: 'Cultural experiences', icon: 'Building' },
    { type: 'region', text: 'Southeast Asia', icon: 'Globe' },
    { type: 'region', text: 'Mediterranean', icon: 'Globe' }
  ];

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    onSearch(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion.text);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    onVoiceSearch();
    // Simulate voice search completion
    setTimeout(() => {
      setIsListening(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative transition-all duration-300 ${
          isFocused ? 'transform scale-105' : ''
        }`}>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon 
              name="Search" 
              size={20} 
              className={`transition-colors duration-200 ${
                isFocused ? 'text-primary' : 'text-text-secondary'
              }`}
            />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => {
              setIsFocused(true);
              if (searchQuery.length > 0) setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder="Search destinations, activities, or regions..."
            className={`block w-full pl-12 pr-20 py-4 border rounded-2xl font-body text-base
              transition-all duration-200 bg-surface/50 backdrop-blur-sm
              ${isFocused 
                ? 'border-primary shadow-soft-md bg-background' 
                : 'border-subtle hover:border-primary/30 hover:bg-surface'
              }
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
              placeholder-text-secondary/70`}
          />
          
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center space-x-2">
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  onSearch('');
                  setShowSuggestions(false);
                }}
                className="p-1 rounded-full text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-all duration-200"
              >
                <Icon name="X" size={16} />
              </button>
            )}
            
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`p-2 rounded-full transition-all duration-200 ${
                isListening
                  ? 'bg-accent text-white animate-pulse' :'text-text-secondary hover:text-primary hover:bg-surface/50'
              }`}
              title="Voice Search"
            >
              <Icon name={isListening ? "MicOff" : "Mic"} size={18} />
            </button>
          </div>
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background rounded-xl shadow-soft-lg border border-subtle z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            {filteredSuggestions.slice(0, 8).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-surface transition-colors duration-200 text-left"
              >
                <div className={`p-2 rounded-lg ${
                  suggestion.type === 'destination' ? 'bg-primary/10 text-primary' :
                  suggestion.type === 'activity'? 'bg-secondary/10 text-secondary-700' : 'bg-accent/10 text-accent'
                }`}>
                  <Icon name={suggestion.icon} size={16} />
                </div>
                <div className="flex-1">
                  <div className="font-body text-sm text-text-primary">
                    {suggestion.text}
                  </div>
                  <div className="font-caption text-xs text-text-secondary capitalize">
                    {suggestion.type}
                  </div>
                </div>
                <Icon name="ArrowUpRight" size={14} className="text-text-secondary" />
              </button>
            ))}
          </div>
          
          {filteredSuggestions.length > 8 && (
            <div className="border-t border-subtle p-3 text-center">
              <span className="font-caption text-xs text-text-secondary">
                +{filteredSuggestions.length - 8} more suggestions
              </span>
            </div>
          )}
        </div>
      )}

      {/* Voice Search Feedback */}
      {isListening && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-accent/10 border border-accent/20 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-accent">
            <Icon name="Mic" size={20} className="animate-pulse" />
            <span className="font-body text-sm">Listening...</span>
          </div>
          <p className="font-caption text-xs text-text-secondary mt-1">
            Speak your destination or travel preferences
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;