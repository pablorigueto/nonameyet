(function ($, Drupal) {
  Drupal.behaviors.setIconStar = {
    attach() {
      $(document).ready(function () {
        if (!drupalSettings.setIconStar) {
          // const nodeSiteAddress = document.querySelector('.page-node-type-site-address');
  
          drupalSettings.setIconStar = true;
        }
      });
    }
  };
})(jQuery, Drupal);
