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
    }
    else {
      const root = document.documentElement;

      //changeIconTheme('light');
      root.style.setProperty('--box-color', '#00000080');
      root.style.setProperty('--box-color-light', '#00000026');
      root.style.setProperty('--border-color', '#00000026');
      root.style.setProperty('--border-light', '#00000026');
      root.style.setProperty('--background-color', '#fff');
      root.style.setProperty('--font-color', '#000');
      root.style.setProperty('--background-textarea', '#fff');
    }
  }

  // // Change thumbs and icons dogs theme.
  // function changeIconTheme(currentBackgroundColor) {

  //   const fiveStarS = document.querySelectorAll('.fivestar-dogs div.fivestar-widget .star');

  //   // Current color white should be dark background.
  //   if (currentBackgroundColor === 'rgb(255, 255, 255)') {
  //     fiveStarS.forEach((anchor) => {
  //       if (!anchor.classList.contains('on')) {
  //         anchor.style.background = 'url(/modules/custom/fivestar/widgets/dogs/dogs-dark.png) no-repeat 0 0';
  //         const childAnchors = anchor.querySelectorAll('a');
  //         childAnchors.forEach((childAnchor) => {
  //           childAnchor.style.background = 'url(/modules/custom/fivestar/widgets/dogs/dogs-dark.png) no-repeat 0 0';
  //         });
  //       }
  //     });
  //   }
  //   else {
  //     fiveStarS.forEach((anchor) => {
  //       if (!anchor.classList.contains('on')) {
  //         anchor.style.background = 'url(/modules/custom/fivestar/widgets/dogs/dogs.png) no-repeat 0 0';
  //         const childAnchors = anchor.querySelectorAll('a');
  //         childAnchors.forEach((childAnchor) => {
  //           childAnchor.style.background = 'url(/modules/custom/fivestar/widgets/dogs/dogs.png) no-repeat 0 0';
  //         });
  //       }
  //     });
  //   }
  // }

  // // Returns current URL.
  // function currentUrl() {
  //   return $(location).attr('href');
  // }

})(jQuery, Drupal);


 