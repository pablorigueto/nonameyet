export const sendLocationDataToBackend = (latitude, longitude, range) => {

  // Define the data to be sent in the request body
  const data = {
    latitude: latitude,
    longitude: longitude,
    range: range,
  };

  // Send a POST request to the backend with the location data
  return fetch('location', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .catch((error) => {
    // Handle error
    console.log(error);
  });
};
