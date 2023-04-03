import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [gpsDisabled, setGpsDisabled] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [fieldElements, setFieldElements] = useState([]);
  const [rangeValue, setRangeValue] = useState(50);
  const [currentRangeValue, setCurrentRangeValue] = useState(rangeValue); // new state variable for current range value

  useEffect(() => {
    checkLocationStatus();
    setIntervalId(setInterval(checkLocationStatus, 1000));
  }, [rangeValue]);

  function checkLocationStatus() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        showPosition(position, rangeValue);
        clearInterval(intervalId);
      }, function(error) {
        if (!gpsDisabled) {
          alert("GPS is disabled");
          setGpsDisabled(true);
        }
      });
    } 
    else {
      alert("Geolocation is not supported");
    }
  }

  function showPosition(position, range = 50) {
    const myData = { latitude: position.coords.latitude, longitude: position.coords.longitude, range: range }; 
    fetch('location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: myData})
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      const fieldElements = response.map((item, index) => (
        <div className="main_content" key={index}>
          <a href={item.pathAlias}>
            <label type="text" name="title_field">{item.title}</label>
            <label type="text" name="address_field">{item.address}</label>
            <label type="text" name="number_field">{item.number}</label>
            <label type="text" name="neighborhood_field">{item.neighborhood}</label>
            <label type="text" name="city_field">{item.city}</label>
            <label type="text" name="state_field">{item.state}</label>
            <label type="text" name="distance_field">Aproximadamente: {item.distance}KM</label>
          </a>
        </div>
      ));
  
      // Update only the output div instead of the entire root
      const outputDiv = document.getElementById('output');
      if (outputDiv) {
        setFieldElements(fieldElements);
      }
    })
    .catch(error => {
      // Handle error
      console.log(error);
    });
  }

  return (
    <div>
      <input type="range" min="0" max="400" className="range" value={rangeValue} onChange={(e) => {setRangeValue(e.target.value); setCurrentRangeValue(e.target.value)}} />
      <label>Current range value: {currentRangeValue}</label> {/* new label to display current range value */}
      <div id="output">{fieldElements}</div>
    </div>
  );
}


const rootElement = document.getElementById('main-react');

// Using createRoot from react-dom/client to render the app
const root = createRoot(rootElement);
root.render(<App />);
