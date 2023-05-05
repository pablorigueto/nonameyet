<?php

namespace Drupal\find_checkin\EventSubscriber;

use Drupal\Core\Routing\TrustedRedirectResponse;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Drupal\Core\Language\LanguageManagerInterface;

/**
 * Redirects to langcode if the path didn't have the / at the end.
 */
class RedirectSubscriber implements EventSubscriberInterface {

  /**
   * The Entity Type Manager Interface.
   *
   * @var Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $languageManager;

  public function __construct(LanguageManagerInterface $languageManager) {
    $this->languageManager = $languageManager;
  }

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
    //$defaultLangcode = $this->languageManager->getDefaultLanguage()->getId();
    //$currentLanguage = $this->getCurrentLanguage();

    // Get all enabled languages.
    $languages = $this->languageManager->getLanguages();

    $pathRemovedFirstChar = substr($path, 1);

    if (isset($languages[$pathRemovedFirstChar])) {
      $response = new TrustedRedirectResponse($path . '/home');
      $event->setResponse($response);
      $event->stopPropagation();
    }
 
  }

  /**
   * Example method that gets the current language.
   */
  public function getCurrentLanguage() {
    // Get the current language object.
    $currentLanguage = $this->languageManager->getCurrentLanguage('content');

    // Get the language code.
    return $currentLanguage->getId();

  }
}