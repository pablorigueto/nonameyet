(function ($, once) {
  var intervalId; // Declare a variable to hold the interval ID
  var gpsDisabled = false; // Declare a flag variable to keep track of whether the GPS is disabled

  Drupal.behaviors.getCoordinates = {
    attach: function () {
      if (!drupalSettings.getCoordinates) {
        // Call the checkLocationStatus() function initially
        checkLocationStatus();
        // Set an interval to check for changes in GPS status every 5 seconds
        intervalId = setInterval(checkLocationStatus, 5000);
        drupalSettings.getCoordinates = true;
      }
    }
  }

  function checkLocationStatus() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // GPS is enabled, call the showPosition() function to get the coordinates
        showPosition(position);
        // Clear the interval once the GPS is enabled
        clearInterval(intervalId);
      }, function (error) {
        // GPS is disabled, handle the error
        if (!gpsDisabled) {
          alert("GPS is disabled");
          gpsDisabled = true;
        }
      });
    } else {
      // Geolocation is not supported in this browser
      console.log("Geolocation is not supported");
    }
  }

  function showPosition(position) {
    let data = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    let url = Drupal.url('location');

    jQuery.ajax({
      url: url,
      type: "POST",
      data: data,
      success: function(response) {
        // Update the DOM with the response data
        jQuery(document).ready(function(){
          console.log(response['la_latitude']);
          console.log(response['lo_longitude']);
          // let jsonResponse = JSON.parse(response);

          // Create a new field element
          let fieldElement = '<input type="text" name="new_field" value="' + response['la_latitude'] + '">';
          fieldElement += '<input type="text" name="new_field" value="' + response['lo_longitude'] + '">';
          // Add the new field element to the form
          jQuery('.main-content').append(fieldElement);
        });
      },
      error: function(xhr, status, error) {
        // Handle error
      }
    });
  }
}(jQuery, once));
