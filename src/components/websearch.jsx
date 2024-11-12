import  { useState, useEffect } from 'react';

import { debounce } from 'lodash';
import { supabase } from '../../utils/supabase';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce search to limit requests
  const debouncedSearch = debounce(async (query) => {
    if (query.length > 2) {
      setLoading(true);
      const { data, error } = await supabase
        .from('karnataka_itihasa_records')
        .select('article_name')
        .textSearch('article_name', query, {
          type: 'websearch', // Using websearch type for more flexible matching
        });

      if (!error) {
        setResults(data);
      } else {
        console.error('Search error:', error.message);
      }
      setLoading(false);
    } else {
      setResults([]);
    }
  }, 300); // 300ms delay for debouncing

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle click on an autocomplete suggestion
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.article_name);
    setResults([]);
  };
  console.log(results)
  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
        placeholder="Search..."
      />
      {loading && <div className="absolute right-2 top-2 text-gray-500">Loading...</div>}
      {results.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          {results.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-indigo-100 cursor-pointer"
              onClick={() => handleSuggestionClick(item)}
            >
              {/* Highlight matched text */}
              <span>{item.article_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
