(function ($, Drupal) {

  // Language switch.
  Drupal.behaviors.dropDown = {
    attach() {
      $(document).ready(function () {
        if (!drupalSettings.dropDown) {
 
          // Toggle the visibility of the dropdown menu when its link is clicked
          const dropdownToggles = document.querySelectorAll('.dropdown > a');
          dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
              e.preventDefault();
              const dropdownMenu = this.nextElementSibling;
              if (dropdownMenu.style.display === 'none' || !dropdownMenu.style.display) {
                dropdownMenu.style.display = 'block';
              } else {
                dropdownMenu.style.display = 'none';
              }
            });
          });

          // Add active class to the clicked link and hide the dropdown menu
          const links = document.querySelectorAll('.dropdown a, .dropdown img');
          links.forEach(link => {
            link.addEventListener('click', function(event) {
              event.preventDefault(); // prevent the default link behavior
              const langcode = link.getAttribute('langcode'); // get the langcode attribute

              // Get the current URL
              const currentUrl = window.location.href;

              // Check if the URL contains the language code
              if (currentUrl.includes(langcode)) {
                return;
              }

              if (langcode == 'pt-br' || langcode == 'en-us' ) {
                window.location.href = `/${langcode}`; // redirect to the language page using the langcode
              }
            });
          });

          // Set the flag to indicate that the behavior has been executed for this page.
          drupalSettings.dropDown = true;
        }
      })
    }
  };


  // Check the link of left menu.
  Drupal.behaviors.leftMenuLink = {
    attach() {
      $(document).ready(function () {
        if (!drupalSettings.leftMenuLink) {

          const firstLink = document.querySelector('#block-yes-pet-app-main-menu .menu__link--level-1:first-child');
          firstLink.addEventListener('click', function(e) {
            e.preventDefault();
            const hrefValue = firstLink.getAttribute('href');
            const home = hrefValue;

            // To get the path.
            const url = new URL(window.location.href);
            const path = url.pathname;

            if (path !== home) {
              window.location.href = home;
            }

          });
          // Set the flag to indicate that the behavior has been executed for this page.
          drupalSettings.leftMenuLink = true;
        }
      })
    }
  };

  // Check the link of left menu.
  Drupal.behaviors.logoRedirect = {
    attach() {
      $(document).ready(function () {
        if (!drupalSettings.logoRedirect) {

          const firstLink = document.querySelector('.reader__logo a');
          firstLink.addEventListener('click', function(e) {
            e.preventDefault();

            // To get the path.
            const url = new URL(window.location.href);
            const path = url.pathname.split('/');
            let lang = '/' + path[1];
            window.location.href = lang;
            // if (!url.pathname.endsWith("/home")) {
            //   window.location.href = lang;
            // }

          });
          // Set the flag to indicate that the behavior has been executed for this page.
          drupalSettings.logoRedirect = true;
        }
      })
    }
  };

  // Drupal.behaviors.homeRedirectLang = {
  //   attach() {
  //     if (!drupalSettings.homeRedirectLang && window.location.pathname === '/') {
  //       const langcode = getCookie('geoip_langcode');
  //       if (langcode) {
  //         const redirectUrl = `${window.location.origin}/${decodeURIComponent(langcode)}`;
  //         window.location.href = redirectUrl;
  //       }
  //       drupalSettings.homeRedirectLang = true;
  //     }
  //   }
  // };
  
  // // Helper function to retrieve the value of a cookie.
  // function getCookie(name) {
  //   const value = "; " + document.cookie;
  //   const parts = value.split("; " + name + "=");
  //   if (parts.length === 2) {
  //     return parts.pop().split(";").shift();
  //   }
  // }
  

  
})(jQuery, Drupal);
