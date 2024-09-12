import React, { useState } from 'react';
import '../styles/Search.css';  // Import your CSS

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='styleDiv'>
        <input 
          className='input' 
          type='text' 
          placeholder='What are you looking for?' 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
      </div>

      <div className='styleDiv'>
        <button className='button' type='submit'>
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
