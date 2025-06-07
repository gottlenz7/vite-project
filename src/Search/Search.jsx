import {useState} from 'react';
import './Search.css';

function Search({onSearch}) {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query === '') {
      alert('вы не ввели запрос')
      return;
    };
    onSearch(query);
  };

  return <>
    <form onSubmit={handleSubmit} className="search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="поиск"
      />
      <button type="submit">найти</button>
    </form>
  </>;
}

export default Search;