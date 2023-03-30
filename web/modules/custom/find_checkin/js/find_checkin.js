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
      // navigator.geolocation.getCurrentPosition(function(position) {
      // // Get the latitude and longitude from the position object
      //   let latitude = position.coords.latitude;
      //   let longitude = position.coords.longitude;
      // });

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

          console.log(response[0]);

          // let jsonResponse = JSON.parse(response);
          // // Get the field value from the response
          // let fieldValue = jsonResponse.field_value;
          // Create a new field element
          let fieldElement = '<input type="text" name="new_field" value="' + fieldValue + '">';
          // Add the new field element to the form
          jQuery('#my-form').append(fieldElement);

        });
      },
      error: function(xhr, status, error) {
        // Handle error
      }
    });


    // console.log("Latitude: " + position.coords.latitude +
    // "<br>Longitude: " + position.coords.longitude);
  }

}(jQuery, once));

 