import {useCallback, useState} from 'react';
import styles from './Search.module.css'

function Search({onSearch}) {
  const [query, setQuery] = useState('');
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (query === '') {
      alert('вы не ввели запрос')
      return;
    };
    onSearch(query);
  }, [query, onSearch]);

  return <>
    <form onSubmit={handleSubmit} className={styles.search}>
      <input className={styles['search-input']}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="поиск"
      />
      <button className={styles['search-button']} type="submit">найти</button>
    </form>
  </>;
}

export default Search;
