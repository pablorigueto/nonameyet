<?php

namespace Drupal\find_checkin\EventSubscriber;

use Drupal\Core\Routing\TrustedRedirectResponse;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Redirects to langcode if the path didn't have the / at the end.
 */
class RedirectSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[KernelEvents::REQUEST][] = ['onRequest'];
    return $events;
  }

  /**
   * Limit this solution only to homepage.
   */
  public function onRequest(RequestEvent $event) {
    $path = $event->getRequest()->getPathInfo();

    if ($path == '/') {
      $response = new TrustedRedirectResponse('/pt-br/home');
      $event->setResponse($response);
      $event->stopPropagation();
    }
 
  }

}