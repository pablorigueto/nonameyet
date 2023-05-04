// import React from 'react';

// const RangeButton = ({ range, onChange }) => {
//   return (
//     <div className="range__div">
//       <label htmlFor="range__label" className="range__label">{ drupalSettings.set_your_range_msg }</label>
//       <input
//         type="range"
//         min="0"
//         max="400"
//         value={range}
//         onChange={onChange}
//         className="range__input"
//       />
//       <div className="range__km">{range} km</div>
//     </div>
//   );
// };

// export default RangeButton;


// import React from 'react';

// const RangeButton = ({ range, onChange }) => {
//   const handleRangeChange = (event) => {
//     const root = document.querySelector(':root');
//     root.style.setProperty('--range_update_value', event.target.value);

//     onChange(event);
//   };

//   return (
//     <div className="range__div">
//       <label htmlFor="range__label" className="range__label">{ drupalSettings.set_your_range_msg }</label>
//       <div className="range__km">{range} km</div>
//       <input
//         type="range"
//         min="0"
//         max="400"
//         value={range}
//         onChange={handleRangeChange}
//         className="range__input"
//       />
//     </div>
//   );
// };

// export default RangeButton;


import React, { useState } from 'react';

const RangeButton = ({ range, onChange }) => {
  const [displayRange, setDisplayRange] = useState(range);

  const handleRangeChange = (event) => {
    const root = document.querySelector(':root');
    root.style.setProperty('--range_update_value', event.target.value);

    setDisplayRange(event.target.value);
    onChange(event);
  };

  return (
    <div className="range__div">
      <label htmlFor="range__label" className="range__label">{ drupalSettings.set_your_range_msg }</label>
      <div className="range__input-container">
        <input
          type="range"
          min="0"
          max="400"
          value={range}
          onChange={handleRangeChange}
          className="range__input"
        />
        <div className="range__km">{displayRange}</div>
      </div>
    </div>
  );
};

export default RangeButton;
