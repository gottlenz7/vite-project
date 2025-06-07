import './Filter.css';
import { useState } from 'react';

function Filter({ options, onSelect }) {
  const [selectedValue, setSelectedValue] = useState(options[0].value);

  const handleChange = (value) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return <>
    <div className="radio-filter">
      {options.map((option) => (
        <label key={option.value} className="radio-option">
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  </>;
}

export default Filter;