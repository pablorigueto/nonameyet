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
            // console.log('test');
          });
        });

        // Set the flag to indicate that the behavior has been executed for this page.
        drupalSettings.avoidDefaultCountVotes = true;
      }
    }
  };

  // Mobile menu behavior
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

  // Search menu behavior
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

  // Theme change behavior
  Drupal.behaviors.changeTheme = {
    attach() {
      if (!drupalSettings.changeTheme) {

        const darkTheme = document.querySelector('.dark__theme');
        const themeIcon = document.querySelector('#theme-icon');
        const menuIcon = document.querySelector('#menu-icon');
        const searchIcon = document.querySelector('#search-icon');

        // const fiveStart = document.querySelector('.fivestar-dogs div.fivestar-widget .star');
        // const fiveStartA = document.querySelector('.fivestar-dogs div.fivestar-widget .star a');        

        const fiveStar = document.querySelector('.star');
        console.log(fiveStar);
        const fiveStarLinks = document.querySelectorAll('.fivestar-dogs div.fivestar-widget .star a');

        darkTheme.addEventListener('click', () => {
          if (themeIcon.src.includes('light-theme')) {
            themeIcon.src = '/themes/custom/yes_pet_app/images/icons/inverted/theme-dark.png';
            menuIcon.src = '/themes/custom/yes_pet_app/images/icons/inverted/harmburger-dark.png';
            searchIcon.src = '/themes/custom/yes_pet_app/images/icons/inverted/search-dark.png';

            fiveStar.classList.add('dark-theme-dogs');

          }
          else {
            themeIcon.src = '/themes/custom/yes_pet_app/images/icons/light-theme.svg';
            menuIcon.src = '/themes/custom/yes_pet_app/images/icons/hamburger-light.svg';
            searchIcon.src = '/themes/custom/yes_pet_app/images/icons/search-light.svg';

            fiveStar.classList.remove('dark-theme-dogs');

          }
        });

        
 
        // Set the flag to indicate that the behavior has been executed for this page.
        drupalSettings.changeTheme = true;
      }
    }
  };


  // Returns current URL.
  function currentUrl() {
    return $(location).attr('href');
  }

})(jQuery, Drupal);


 