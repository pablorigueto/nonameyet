export const getLocation = (handleSuccess, handleError, handleStatusChange) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      result.onchange = () => {
        handleStatusChange(result.state);
      };
    });
  } else {
    handleError({ message: 'Geolocation is not supported' });
  }
};
