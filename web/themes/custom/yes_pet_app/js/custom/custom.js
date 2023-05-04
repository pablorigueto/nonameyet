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
        
        searchIcon.addEventListener('click', function() {
          if (navMenuSearch.style.left === '3.2rem') {
            navMenuSearch.style.left = '2000px';
          } 
          else {
            navMenuSearch.style.left = '3.2rem';
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
            // Get a reference to the root element
            const root = document.documentElement;

            // Get the background color of the body element
            const bodyStyle = window.getComputedStyle(document.body);
            const currentBackgroundColor = bodyStyle.backgroundColor;

            // Change theme.
            changeTheme(currentBackgroundColor);
            // Toggle between the two themes based on the current background color
            if (currentBackgroundColor === 'rgb(255, 255, 255)') {
              // Store the current theme in localStorage
              localStorage.setItem('theme', 'dark');
             }
              else {
                // Store the current theme in localStorage
                localStorage.setItem('theme', 'light');
              }
            });
          // Set the flag to indicate that the behavior has been executed for this page.
          drupalSettings.changeTheme = true;
        }
      })
    }
  };

  function changeTheme(currentTheme) {
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
 
  // Theme change color through root vars.
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
          const links = document.querySelectorAll('.dropdown a');
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
                window.location.href = `/${langcode}/home`; // redirect to the language page using the langcode
              }

              // links.forEach(link => link.classList.remove('active'));
              // this.classList.add('active');
              // const dropdownMenu = this.closest('.dropdown-menu');
              // if (dropdownMenu) {
              //   dropdownMenu.style.display = 'none';
              // }
            });
          });
          
          // Get all the links
          // const links = document.querySelectorAll('.dropdown-menu a');

          // // Add click event listener to each link
          // links.forEach(link => {
          //   link.addEventListener('click', (event) => {
          //     event.preventDefault(); // prevent the default link behavior
          //     const langcode = link.getAttribute('langcode'); // get the langcode attribute
          //     window.location.href = `/${langcode}/page.html`; // redirect to the language page using the langcode
          //   });
          // });

          // Set the flag to indicate that the behavior has been executed for this page.
          drupalSettings.dropDown = true;
        }
      })
    }
  };

  // // Returns current URL.
  // function currentUrl() {
  //   return $(location).attr('href');
  // }

})(jQuery, Drupal);


 