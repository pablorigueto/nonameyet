import React from 'react';
import { createRoot } from 'react-dom/client';
import _ from 'lodash';
import RangeButton from './buttons/RangeButton';
import FieldElements from './buttons/FieldElements';
import { sendLocationDataToBackend } from './api/Fetch';
import { getLocation } from './location/LocationUtils';

const rootElement = document.getElementById('content-main-react');

if (rootElement) {

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
        gpsDisabled: false, // initialize the gpsDisabled flag as false
        isLoading: false, // add isLoading state
      };
      // Create a debounced version of the sendLocationDataToBackend function
      this.debouncedSendLocationDataToBackend = _.debounce(this.sendLocationDataToBackend, 400);
    }

    componentDidMount() {
      getLocation(this.handleSuccess, this.handleError, this.handleStatusChange);
      this.intervalId = setInterval(() => {
        getLocation(this.handleSuccess, this.handleError, this.handleStatusChange);
      }, 1700);

    }

    componentWillUnmount() {
      // Clear the interval when the component is unmounted
      clearInterval(this.intervalId);
    }

    // A function to handle successful retrieval of the user's location
    handleSuccess = (position) => {
      // Set the latitude, longitude, and error properties in the state
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: false,
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
          error: true,
          gpsDisabled: true, // set the gpsDisabled flag to true
        });
      } else {
        this.setState({ error: error.message, gpsDisabled: false });
      }
    };

    // A function to handle changes in the GPS status
    handleStatusChange = (status) => {
      if (status === 'granted') {
        this.resetGPSDisabled(); // reset the gpsDisabled flag
        getLocation(this.handleSuccess, this.handleError, this.handleStatusChange);
      }
    };

    resetGPSDisabled = () => {
      this.setState({ gpsDisabled: false });
    };
    
    // A function to send location data to the backend API
    sendLocationDataToBackend = (latitude, longitude, range) => {
      this.setState({ isLoading: true, fieldElements: null }); // set isLoading and fieldElements state
      sendLocationDataToBackend(latitude, longitude, range)
      .then((response) => {
        // Map the response data to field elements and set the state with the new fieldElements
        if (response.length > 0) {
          console.log(response);
          // Map the response data to field elements and set the state with the new fieldElements
          this.setState({ isLoading: false, fieldElements: <FieldElements data={response} /> });
        }
        else {
          // If response is null, set the fieldElements state to a default text.
          this.setState({ isLoading: false, fieldElements: 

            <button className="btn" type="button">
            <strong>{drupalSettings.increase_range_msg}</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>
          
            <div id="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </button>});
 
        }
      });
    };

    handleRangeChange = (event) => {
      const range = event.target.value;
      const { latitude, longitude } = this.state;
      if (latitude && longitude) {
        this.setState({ range }, () => {
          const { latitude, longitude, range } = this.state;
          // Call the debounced function instead of the original sendLocationDataToBackend function
          this.debouncedSendLocationDataToBackend(latitude, longitude, range);
        });
      } else {
        event.preventDefault();
      }
    };

    render() {
      const { fieldElements, range, gpsDisabled, error, isLoading} = this.state;

      return (
        <div>
          <RangeButton range={range} onChange={this.handleRangeChange} />

          {fieldElements}

          {error && !isLoading && gpsDisabled ? (
            <div id="gps-error">{ drupalSettings.enable_gps_msg }</div>
          ) : null}

        </div>
      );
    }
 
  }

  const root = createRoot(rootElement);
  root.render(<AutoDom />);
  
}
