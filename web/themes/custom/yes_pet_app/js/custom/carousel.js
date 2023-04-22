(function ($, Drupal) {

	Drupal.behaviors.carousels = {
    attach() {
      if (!drupalSettings.carousels) {
        $(document).ready(function () {
					$('.owl-carousel').owlCarousel({
						autoplay: false,
						autoplayTimeout: 5000,
						autoplayHoverPause: true,
						thumbs: true,
						merge:true,
						responsive: {
							0:{
								items:1,
								nav:true,
								loop:true,
								dots: false,
								center: true,
							}
						},
					});
        });
        drupalSettings.carousels = true;
      }
    }
  }

})(jQuery, Drupal);
