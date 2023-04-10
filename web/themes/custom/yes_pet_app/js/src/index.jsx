import React from 'react';
import { createRoot } from 'react-dom/client';
import _ from 'lodash';
import RangeButton from './buttons/RangeButton';
import FieldElements from './buttons/FieldElements';
import { sendLocationDataToBackend } from './api/Fetch';

class AutoDom extends React.Component {
  constructor(props) {
    super(props);
    // Initialize the component's state with latitude, longitude, error, and range properties
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      range: 50,
      fieldElements: null, // initialize fieldElements as null
    };
    // Create a debounced version of the sendLocationDataToBackend function
    this.debouncedSendLocationDataToBackend = _.debounce(this.sendLocationDataToBackend, 400);
  }

  componentDidMount() {
    // Call the function to retrieve location and set an interval to call it every 1.7 seconds
    this.getLocation();
    this.intervalId = setInterval(this.getLocation, 1700);
  }

  componentWillUnmount() {
    // Clear the interval when the component is unmounted
    clearInterval(this.intervalId);
  }

  // A function to retrieve the user's location and handle status changes
  getLocation = () => {
    if (navigator.geolocation) {
      // Call the getCurrentPosition method to retrieve the location and pass in success and error handlers
      navigator.geolocation.getCurrentPosition(
        this.handleSuccess,
        this.handleError
      );
      // Add an event listener for changes in GPS status and call the handleStatusChange function
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        result.onchange = () => {
          this.handleStatusChange(result.state);
        };
      });
    } else {
      // If geolocation is not supported, set the error message in the state
      this.setState({ error: 'Geolocation is not supported' });
    }
  };

  // A function to handle successful retrieval of the user's location
  handleSuccess = (position) => {
    // Set the latitude, longitude, and error properties in the state
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      error: null,
    });

    // Send the location data to the backend
    this.sendLocationDataToBackend(
      position.coords.latitude,
      position.coords.longitude,
      this.state.range
    );

    // Clear the interval after the first successful call to getCurrentPosition
    clearInterval(this.intervalId);
  };

  // A function to handle errors in retrieving the user's location
  handleError = (error) => {
    // Check if the error is due to GPS being disabled and set the error message accordingly
    if (error.code === error.PERMISSION_DENIED) {
      this.setState({
        error: 'Please enable GPS to retrieve location data',
      });
    } else {
      this.setState({ error: error.message });
    }
  };

  // A function to handle changes in the GPS status
  handleStatusChange = (status) => {
    if (status === 'granted') {
      // Call the getLocation function again if the status changes to granted
      this.getLocation();
    }
  };

  // A function to send location data to the backend API
  sendLocationDataToBackend = (latitude, longitude, range) => {
    sendLocationDataToBackend(latitude, longitude, range)
      .then((response) => {
        console.log(response);
        // Map the response data to field elements and set the state with the new fieldElements
        this.setState({ fieldElements: <FieldElements data={response} /> });
      });
  };

  handleRangeChange = (event) => {
    const range = event.target.value;
    this.setState({ range }, () => {
      const { latitude, longitude, range } = this.state;
      // Call the debounced function instead of the original sendLocationDataToBackend function
      this.debouncedSendLocationDataToBackend(latitude, longitude, range);
    });
  };

  render() {
    const { fieldElements, range } = this.state;
  
    return (
      <div>
        <RangeButton range={range} onChange={this.handleRangeChange} />
        {fieldElements}
      </div>
    );
  }
}

export default AutoDom;

const rootElement = document.getElementById('content-main-react');

// Using createRoot from react-dom/client to render the app
const root = createRoot(rootElement);
root.render(<AutoDom />);
