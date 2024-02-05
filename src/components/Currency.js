// Currency.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Currency = () => {
  const { dispatch, currency } = useContext(AppContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleCurrencyChange = (newCurrency) => {
    dispatch({
      type: 'CHG_CURRENCY',
      payload: newCurrency,
    });
  };

  return (
    <div
      style={{
        backgroundColor: isHovered ? '#2980b9' : '#3498db', // Change background color on hover
        padding: '10px',
        borderRadius: '5px',
        transition: 'background-color 0.3s', // Add transition for smooth color change
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <label style={{ color: '#ffffff', marginRight: '10px' }}>Currency:</label>
      <select
        style={{
          padding: '5px',
          borderRadius: '5px',
          backgroundColor: '#f2f2f2',
          color: '#333',
          cursor: 'pointer',
        }}
        onChange={(e) => handleCurrencyChange(e.target.value)}
        value={currency}
      >
        <option value="£">£ Pound</option>
        <option value="$">$ Dollar</option>
        <option value="€">€ Euro</option>
        <option value="₹">₹ Ruppee</option>
      </select>
    </div>
  );
};

export default Currency;
