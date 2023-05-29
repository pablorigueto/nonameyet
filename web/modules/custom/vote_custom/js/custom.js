(function ($, Drupal) {
  Drupal.behaviors.setIconStar = {
    attach() {
      $(document).ready(function () {
        if (!drupalSettings.setIconStar) {
     
  
          drupalSettings.setIconStar = true;
        }
      });
    }
  };
})(jQuery, Drupal);
