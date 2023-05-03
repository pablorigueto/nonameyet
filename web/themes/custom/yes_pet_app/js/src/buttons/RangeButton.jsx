import React from 'react';

const RangeButton = ({ range, onChange }) => {
  return (
    <div className="range__div">
      <label htmlFor="range__label" class="range__label">{ drupalSettings.set_your_range_msg }</label>
      <input
        type="range"
        min="0"
        max="400"
        value={range}
        onChange={onChange}
        className="range__input"
      />
      <div class="range__km">{range} km</div>
    </div>
  );
};

export default RangeButton;
