import React from 'react';

const Input = ({ label, type, placeholder, value, name, onChange, handleBlur, handleFocus, focused }) => {
  return (
    <div className={`input-container ${focused ? 'focused' : ''}`}>
      <input
        type={type}
        name={name}
        id={`input-${label.toLowerCase().replace(/\s/g, '-')}`}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        autoComplete='off'
      />
      <label htmlFor={`input-${label.toLowerCase().replace(/\s/g, '-')}`} className="custom-label">{label}</label>
    </div>
  );
};

export default Input;
