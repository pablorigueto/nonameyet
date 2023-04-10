import React from 'react';

const RangeButton = ({ range, onChange }) => {
  return (
    <div className="range__div">
      <label htmlFor="range__input">Set your range</label>
      <input
        type="range"
        min="0"
        max="400"
        value={range}
        onChange={onChange}
        className="range__input"
      />
      <div>{range} km</div>
    </div>
  );
};

export default RangeButton;
