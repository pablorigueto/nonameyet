<?php

namespace Drupal\lang_redirect_and_geoip\EventSubscriber;

use Drupal\Core\Routing\TrustedRedirectResponse;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Drupal\Core\Language\LanguageManagerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Redirects to langcode if the path didn't have the / at the end.
 */
class RedirectSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */ 
  public function onRequest(RequestEvent $event) {
    $request = $event->getRequest();

    // Redirect only on the homepage.
    if ($request->getRequestUri() !== '/') {
      return;
    }

    // Get the langcode from the cookie, or use 'en' as the default.
    $langcode = $_COOKIE['geoip_langcode'];

    if (!$langcode) {
      return;
    }

    // Get the current URL without the base URL.
    $url_path = $request->getPathInfo();

    // Create the new URL with the correct langcode.
    $new_url = $langcode . $url_path;

    // Create a redirect response.
    $response = new RedirectResponse($new_url, 301);

    // Set the response on the event.
    $event->setResponse($response);
  }
  
  public static function getSubscribedEvents() {
    $events[KernelEvents::REQUEST][] = ['onRequest'];
    return $events;
  }

}
