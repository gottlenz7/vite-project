import styles from './Filter.module.css';
import { useCallback, useState } from 'react';

function Filter({ options, onSelect }) {
  const [selectedValue, setSelectedValue] = useState(options[0].value);

  const handleChange = useCallback((value) => {
    setSelectedValue(value);
    onSelect(value);
  }, [onSelect]); 

  return (
    <div className={styles['radio-filter']}> {}
      {options.map((option) => (
        <label key={option.value} className={styles['radio-option']}>
          <input
            className={styles['radio-option-input']}
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

export default Filter;