<?php

namespace Drupal\lang_redirect_and_geoip\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Redirects to langcode if the path didn't have the / at the end.
 */
class RedirectSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */ 
  public function onRequest(RequestEvent $event) {
    
    $request = $event->getRequest();

    if ($request->getPathInfo() !== "/") {
      return;
    }

    // Get the langcode from the cookie, or use 'en' as the default.
    $langcode = $_COOKIE['geoip_langcode'] ?? '/en-us/';

    if (!$langcode) {
      return;
    }

    // Create a redirect response without any cache tags or contexts.
    $response = new RedirectResponse($langcode, 301, ['Cache-Control' => 'no-cache']);

    // Set the response on the event.
    $event->setResponse($response);
    $event->stopPropagation();

  }
  
  public static function getSubscribedEvents() {
    $events[KernelEvents::REQUEST][] = ['onRequest'];
    return $events;
  }

}
