import React,{ useState} from 'react';

function SearchBar({onSearch}) {

  const [query, setQuery] = useState('');

  const styleDiv = { 
    textAlign: 'center', 
    marginTop: '50px',
  }

  const input ={
    borderRadius : '20px',
    width: '300px',
    height: '50px',
    fontSize: '16px',
    textAlign: 'center',
  }

  const button ={
    backgroundColor: '#9b59b6', 
    color: '#ffffff', 
    border: 'none', 
    padding: '12px 80px', 
    borderRadius: '25px', 
    fontSize: '20px', 
    cursor: 'pointer', 
    transition: 'background-color 0.3s ease', 
    fontWeight: 700,

  }

  const buttonHover ={
    backgroundColor: '#8e44ad',
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  }

  return(
    <form onSubmit={handleSubmit}>
    <div style={styleDiv}>
    <input 
    style={input} 
    type='text' 
    placeholder='What are you looking for?'
    value={query}
    onChange={(e) => setQuery(e.target.value)}

    
    ></input>
    </div>

    <div style={styleDiv}>
      <button 
      style={button}
      type='submit'
      onMouseEnter={(e) => e.target.style.backgroundColor = buttonHover.backgroundColor}
      onMouseLeave={(e) => e.target.style.backgroundColor = button.backgroundColor}
      >Search</button>

    </div>

    </form>

  )
}

export default SearchBar;