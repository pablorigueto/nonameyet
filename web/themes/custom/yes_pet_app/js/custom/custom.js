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

        const mobileNavButton = document.querySelector('.mobile-nav-button');
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




  // Returns current URL.
  function currentUrl() {
    return $(location).attr('href');
  }

})(jQuery, Drupal);


 