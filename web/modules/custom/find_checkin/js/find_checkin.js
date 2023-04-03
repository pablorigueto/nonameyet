(function ($, once) {
  // Declare a variable to hold the interval ID.
  var intervalId;
  // Declare a flag variable to keep track of whether the GPS is disabled.
  var gpsDisabled = false;

  Drupal.behaviors.getCoordinates = {
    attach: function () {
      if (!drupalSettings.getCoordinates) {
        // Call the checkLocationStatus() function initially
        checkLocationStatus();
        // Set an interval to check for changes in GPS status every 1 seconds.
        intervalId = setInterval(checkLocationStatus, 1000);
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
      alert("Geolocation is not supported");
    }
  }

  function showPosition(position, range = 50) {
    let data = {latitude: position.coords.latitude, longitude: position.coords.longitude, range: range};
    let url = Drupal.url('location');
    jQuery.ajax({
      url: url,
      type: "POST",
      data: data,
      success: function(response) {
        // Update the DOM with the response data
        jQuery(document).ready(function(){
          // Generate the field elements dynamically
          let fieldElement = '';

          if (jQuery('.main_content').length) {
            jQuery('.main_content').remove();
          }

          for (let i = 0; i < response.length; i++) {
            fieldElement +=
              '<div class="main_content"> \
                <a href='+response[i]['pathAlias']+'>\
                  <label type="text" name="title_field">' + response[i]['title'] + '</label> \
                  <label type="text" name="address_field">' + response[i]['address'] + '</label> \
                  <label type="text" name="number_field">' + response[i]['number'] + '</label> \
                  <label type="text" name="neighborhood_field">' + response[i]['neighborhood'] + '</label> \
                  <label type="text" name="city_field">' + response[i]['city'] + '</label> \
                  <label type="text" name="state_field">' + response[i]['state'] + '</label> \
                  <label type="text" name="distance_field">Aproximadamente: ' + response[i]['distance'] + 'KM</label> \
                </a>\
              </div>';
          }
          // Add the new field element to the form
          jQuery('.homepage-form').append(fieldElement);
        });
      },
      error: function(xhr, status, error) {
        // Handle error
      }
    });
  }

  // When the user change the range, call the showPosition again.
  $(document).ready(function() {
    $('.range').change(function() {
      const rangeSelected = $(this).val();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          showPosition(position, rangeSelected);
        },
        function (error) {
          // GPS is disabled, handle the error
          if (!gpsDisabled) {
            alert("GPS is disabled");
            gpsDisabled = true;
          }
        });
      }
    });
  });

}(jQuery, once));
