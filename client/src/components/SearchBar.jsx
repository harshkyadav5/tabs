import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { SearchIcon, SearchSubmitArrowIcon, BookmarkThinIcon, NoteThinIcon, TagIcon } from "./icons";

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
          <SearchIcon className="h-5 w-5 text-gray-400" />
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
              <SearchSubmitArrowIcon className="h-5 w-5" />
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
                  <BookmarkThinIcon className="h-4 w-4 text-indigo-500" />
                )}
                {suggestion.type === 'note' && (
                  <NoteThinIcon className="h-4 w-4 text-yellow-500" />
                )}
                {suggestion.type === 'tag' && (
                  <TagIcon className="h-4 w-4 text-purple-500" />
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
