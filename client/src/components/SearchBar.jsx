import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SearchBar = ({ onSearch, className = "", placeholder = "Search" }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    bookmarks: true,
    notes: true,
    clipboard: true,
    screenshots: true,
    colors: true,
    music: true
  });
  const [isSearching, setIsSearching] = useState(false);
  const [searchStats, setSearchStats] = useState(null);
  
  const { token } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceRef = useRef(null);

  // Fetch search statistics
  useEffect(() => {
    if (token) {
      axios.get("/api/search/stats")
        .then(response => setSearchStats(response.data))
        .catch(error => console.error("Failed to fetch search stats:", error));
    }
  }, [token]);

  // Handle input changes with debouncing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce suggestions
    if (value.length >= 1) {
      debounceRef.current = setTimeout(() => {
        fetchSuggestions(value);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Fetch search suggestions
  const fetchSuggestions = async (searchQuery) => {
    if (!token) return;
    
    try {
      const response = await axios.get(`/api/search/suggestions?query=${encodeURIComponent(searchQuery)}&limit=8`);
      setSuggestions(response.data.suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    }
  };

  // Handle search submission
  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim() || !token) return;
    
    setIsSearching(true);
    setShowSuggestions(false);
    
    try {
      const activeFilters = Object.keys(filters).filter(key => filters[key]);
      const response = await axios.post("/api/search", {
        query: searchQuery.trim(),
        filters: activeFilters,
        limit: 50
      });
      
      if (onSearch) {
        onSearch(response.data);
      } else {
        // Navigate to search results page
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}&filters=${activeFilters.join(',')}`);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    handleSearch(suggestion.text);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter toggle component
  const FilterToggle = ({ type, label, count }) => (
    <button
      onClick={() => setFilters(prev => ({ ...prev, [type]: !prev[type] }))}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        filters[type]
          ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
          : "bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200"
      }`}
    >
      <span>{label}</span>
      {count && (
        <span className="text-xs bg-white px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
        
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {isSearching ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"></div>
          ) : (
            <button
              onClick={() => handleSearch()}
              disabled={!query.trim()}
              className="text-gray-400 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {searchStats && (
        <div className="mt-3 flex flex-wrap gap-2">
          <FilterToggle 
            type="bookmarks" 
            label="Bookmarks" 
            count={searchStats.total_bookmarks} 
          />
          <FilterToggle 
            type="notes" 
            label="Notes" 
            count={searchStats.total_notes} 
          />
          <FilterToggle 
            type="clipboard" 
            label="Clipboard" 
            count={searchStats.total_clipboard} 
          />
          <FilterToggle 
            type="screenshots" 
            label="Screenshots" 
            count={searchStats.total_screenshots} 
          />
          <FilterToggle 
            type="colors" 
            label="Colors" 
            count={searchStats.total_colors} 
          />
          <FilterToggle 
            type="music" 
            label="Music" 
            count={searchStats.total_music} 
          />
        </div>
      )}

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center gap-3"
            >
              <div className="flex-shrink-0">
                {suggestion.type === 'bookmark' && (
                  <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
                  </svg>
                )}
                {suggestion.type === 'note' && (
                  <svg className="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z" />
                  </svg>
                )}
                {suggestion.type === 'tag' && (
                  <svg className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                )}
              </div>
              
              {/* Suggestion text */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {suggestion.text}
                </div>
                <div className="text-xs text-gray-500">
                  {suggestion.category}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && suggestions.length === 0 && query.length >= 1 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
          <div className="text-sm text-gray-500 text-center">
            No suggestions found for "{query}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
