import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';

const GetArtistList = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchArtists = async () => {
      if (!query) {
        setArtists([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(`/api/bands?q=${encodeURIComponent(query)}`);
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setArtists([]);
      }
      setIsLoading(false);
    };

    const timeoutId = setTimeout(fetchArtists, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (artist) => {
    setQuery(artist.label);
    setIsOpen(false);
    if (onSelect) {
      onSelect(artist);
    }
  };

  const formatListeners = (listeners) => {
    const num = parseInt(listeners);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Search for an artist..."
        />
        <div className="absolute right-3 top-2.5 text-gray-400">
          {isLoading ? (
            <div className="animate-spin w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full" />
          ) : (
            <Search size={20} />
          )}
        </div>
      </div>

      {isOpen && artists.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {artists.map((artist, index) => (
            <div
              key={`${artist.value}-${index}`}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
              onClick={() => handleSelect(artist)}
            >
              <span className="font-medium">{artist.label}</span>
              {artist.listeners && (
                <div className="flex items-center text-sm text-gray-500">
                  <Users size={16} className="mr-1" />
                  {formatListeners(artist.listeners)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetArtistList;