(function ($, once) {

  Drupal.behaviors.getCoordinates = {
    attach: function () {
      if (!drupalSettings.getCoordinates) {

        // Check if the browser supports the Geolocation API
        if (navigator.geolocation) {
          // Listen for the "permissionschange" event
          navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
            result.onchange = function() {
              if (result.state === 'granted') {
                console.log('apos mudança');
                // Call the checkGeolocation() function if geolocation permission is granted
                checkGeolocation();
              }
            };
          });

          // Call the checkGeolocation() function initially
          checkGeolocation();
        }
        else {
          // If the browser doesn't support the Geolocation API, display an error message
          alert("Geolocation is not supported by this browser.");
        }

        drupalSettings.getCoordinates = true;
      }
    }
 
  }
 
  function checkGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
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
          jQuery('.node__content').append(fieldElement);

        });
      },
      error: function(xhr, status, error) {
        // Handle error
      }
    });

  }

}(jQuery, once));

 