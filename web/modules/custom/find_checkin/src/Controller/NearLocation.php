<?php

namespace Drupal\find_checkin\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\DependencyInjection\ContainerInterface;

class NearLocation extends ControllerBase {

  /**
   * The Request Stack service.
   *
   * @var Symfony\Component\HttpFoundation\RequestStack
   */
  protected $requestStack;

  /**
   * {@inheritdoc}
   */
  public function __construct(
    RequestStack $requestStack,
  ) {
    $this->requestStack = $requestStack;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container): self {
    return new static(
      $container->get('request_stack'),
    );
  }
  
  public function queryNearLocation(): JsonResponse {

    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];


    // Get the querys from url and check if have something near.
    $near_location = $this->getQueryUrl();

    return new JsonResponse($near_location);
  }


  /**
   * {@inheritdoc}
   */
  protected function getQueryUrl(): mixed {
    $currentRequest = $this->requestStack->getCurrentRequest();
    $currentLatitude = $currentRequest->request->get('latitude');
    $currentLongitude = $currentRequest->request->get('longitude');
    if (!empty($currentLatitude) && !empty($currentLongitude)) {
      return [
        'la_latitude' => 'Back end Latitude:' . $currentLatitude,
        'lo_longitude' => 'Back end Longitude:' .$currentLongitude,
      ];
    }
  }

}
