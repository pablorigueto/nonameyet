(function ($, Drupal) {

  // It's to core comment bug on edit/del that was edit
  // and didn't render the last revision of comment. 
  Drupal.behaviors.moveDivToInsideEditDel = {
    attach() {
      if (!drupalSettings.moveDivToInsideEditDel) {
        const commentEditDiv = document.querySelector('.comment_edit')
        // Check first if the dom has this class.
        if (commentEditDiv) {
          const ol = document.querySelector('.breadcrumb__list');
          const li = ol.children[1];
          ol.replaceChild(commentEditDiv, li);
          commentEditDiv.removeAttribute('style');
        }
        // Set the flag to indicate that the behavior has been executed for this page.
        drupalSettings.moveDivToInsideEditDel = true;
      }
    }
  };

  // It's to avoid count when clicks on score of vote/up/down.
  Drupal.behaviors.avoidDefaultCountVotes = {
    attach() {
      if (!drupalSettings.avoidDefaultCountVotes) {

        const voteScoreElements = document.querySelectorAll('.vote-current-score');
        voteScoreElements.forEach(function(element) {
          element.addEventListener('click', function(event) {
            event.preventDefault();

          });
        });

        // Set the flag to indicate that the behavior has been executed for this page.
        drupalSettings.avoidDefaultCountVotes = true;
      }
    }
  };

  // Mobile menu behavior.
  Drupal.behaviors.mobileMenu = {
    attach() {
      if (!drupalSettings.mobileMenu) {

        const mobileNavButton = document.querySelector('.btn-hamburger');
        const headerNav = document.getElementById('header-nav');
        
        mobileNavButton.addEventListener('click', function() {
          if (headerNav.style.left === '0px') {
            headerNav.style.left = '-100%';
          }
          else {
            headerNav.style.left = '0px';
          }
        });

        const closeMobileButton = document.querySelector('.close__mobile_menu');
        
        closeMobileButton.addEventListener('click', function() {
          headerNav.style.left = '-100%';  
        });

        // Set the flag to indicate that the behavior has been executed for this page.
        drupalSettings.mobileMenu = true;
      }
    }
  };

  // Search menu behavior.
  Drupal.behaviors.readerSearch = {
    attach() {
      if (!drupalSettings.readerSearch) {

        const searchIcon = document.querySelector('.search__icon');
        const navMenuSearch = document.getElementById('edit-keys');
        const screenWidth = window.screen.width; 
        const root = document.documentElement;
 
        searchIcon.addEventListener('click', function() {
          
        // Get the computed style of the #edit-keys element
        let computedStyle = getComputedStyle(navMenuSearch);

        // Get the value of the left property
        let leftValue = computedStyle.getPropertyValue('left');

          let halfScreenWidth = (screenWidth / 2) - 174;

          if (screenWidth >= 450) {
            halfScreenWidth = halfScreenWidth + 14;
          }

          if (leftValue === '8880px') {
            
            navMenuSearch.style.left = halfScreenWidth +'px';
          }
          else {
            navMenuSearch.style.left = '555rem';
          }
        });

        // Set the flag to indicate that the behavior has been executed for this page.
        drupalSettings.readerSearch = true;
      }
    }
  };

  // Theme change color based on localStorage.
  Drupal.behaviors.storageChangeTheme = {
    attach() {
      // $(document).ready(function () {
      if (!drupalSettings.storageChangeTheme) {
        // On page load, retrieve the current theme from localStorage
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
          changeTheme(currentTheme);
        }
        drupalSettings.storageChangeTheme = true;
      }
      // })
    }
  };

  // Theme change color through root vars.
  Drupal.behaviors.changeTheme = {
    attach() {
      $(document).ready(function () {
        if (!drupalSettings.changeTheme) {

          // When user click on dark theme to change the theme.
          const darkTheme = document.querySelector('.dark__theme');
          darkTheme.addEventListener('click', () => {

            // Get the background color of the body element
            const bodyStyle = window.getComputedStyle(document.body);
            const currentBackgroundColor = bodyStyle.backgroundColor;

            // Change theme.
            changeTheme(currentBackgroundColor);
            // Toggle between the two themes based on the current background color
            if (currentBackgroundColor === 'rgb(255, 255, 255)') {
              // Store the current theme in localStorage
              localStorage.setItem('theme', 'dark');
              //document.cookie = "theme=dark";
             }
              else {
                // Store the current theme in localStorage
                localStorage.setItem('theme', 'light');
                //document.cookie = "theme=light";
              }
            });
          // Set the flag to indicate that the behavior has been executed for this page.
          drupalSettings.changeTheme = true;
        }
      })
    }
  };

  function changeTheme(currentTheme) {

    // // Remove an existing CSS.
    // const styleElement = document.querySelector('#styled-cache');
    // if (typeof styleElement !== 'undefined' && styleElement !== null) {
    //   styleElement.remove();
    // }
    // If a theme is stored in localStorage, apply it
    if (currentTheme === 'dark' || currentTheme === 'rgb(255, 255, 255)') {
      const root = document.documentElement;

      //changeIconTheme('rgb(255, 255, 255)');
      root.style.setProperty('--box-color', '#000');
      root.style.setProperty('--box-color-light', '#000');
      root.style.setProperty('--border-color', '#0000');
      root.style.setProperty('--border-light', '#fff');
      root.style.setProperty('--background-color', '#353535');
      root.style.setProperty('--font-color', '#fff');
      root.style.setProperty('--background-textarea', '#262626');
      root.style.setProperty('--font-stars-color', '#fff');
      root.style.setProperty('--stars-color-1', '#fe53baa2');
      root.style.setProperty('--stars-color-2', '#8e51eab4');

      root.style.setProperty('--black-and-salmon', 'darksalmon');
      root.style.setProperty('--black-and-white', '#000');
      root.style.setProperty('--color-gray', '#EAEBEC');      
    }
    else {
      const root = document.documentElement;

      //changeIconTheme('light');
      root.style.setProperty('--box-color', '#00000080');
      root.style.setProperty('--box-color-light', '#00000026');
      root.style.setProperty('--border-color', '#00000026');
      root.style.setProperty('--border-light', '#00000026');
      root.style.setProperty('--background-color', '#fff');
      root.style.setProperty('--font-color', '#353535');
      root.style.setProperty('--background-textarea', '#fff');
      root.style.setProperty('--stars-color-1', 'unset');
      root.style.setProperty('--stars-color-2', 'unset');

      root.style.setProperty('--black-and-salmon', '#000');
      root.style.setProperty('--black-and-white', '#fff');
      root.style.setProperty('--color-gray', '#424242');
 

    }
  }

  // Copy address infos to clip board.
  Drupal.behaviors.copyAddressToClipBoard = {
    attach() {
      $(document).ready(function () {
        if (!drupalSettings.copyAddressToClipBoard) {

          // Get the element with the class "simple-gmap-address"
          const addressElement = document.querySelector('.simple-gmap-address');
          if (addressElement !== null) {

            // Add a click event listener to the element
            addressElement.addEventListener('click', function() {
              console.log(addressElement);
              // Get the text inside the element
              const addressText = addressElement.textContent.trim();
              // Copy the text to the clipboard
              navigator.clipboard.writeText(addressText);
  
              let timerInterval
              Swal.fire({
                title: 'Copied!',
                // html: 'I will close in <b></b> milliseconds.',
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading()
                  const b = Swal.getHtmlContainer().querySelector('b')
                  timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                  }, 100)
                },
                willClose: () => {
                  clearInterval(timerInterval)
                }
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  console.log('I was closed by the timer')
                }
              })

            });
          }
          // Set the flag to indicate that the behavior has been executed for this page.
          drupalSettings.copyAddressToClipBoard = true;
        }
      })
    }
  };

  // Returns device type.
  function deviceType() {
    // Get the user agent string
    const userAgent = navigator.userAgent;
    // Check if the user agent string contains any of the keywords for mobile devices
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    // Check if the user agent string contains any of the keywords for tablet devices
    var isTablet = /Tablet|iPad/i.test(userAgent);

    // Print the device type based on the above checks
    if (isMobile) {
      console.log("Device is a mobile phone");
    } else if (isTablet) {
      console.log("Device is a tablet");
    } else {
      console.log("Device is a desktop or laptop computer");
    }


    return navigator.userAgent;
  }

// Check if the user agent string contains any of the keywords for mobile devices

  // // Returns current URL.
  // function currentUrl() {
  //   return $(location).attr('href');
  // }

})(jQuery, Drupal);


 