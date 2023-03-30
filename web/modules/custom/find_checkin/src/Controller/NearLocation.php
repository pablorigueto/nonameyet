<?php

namespace Drupal\find_checkin\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

class NearLocation extends ControllerBase {

  public function queryNearLocation() {
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];

    // $query = \Drupal::database()->select('my_table', 't');
    // $query->fields('t', ['field1', 'field2']);
    // $query->condition('t.latitude', $latitude);
    // $query->condition('t.longitude', $longitude);
    // $result = $query->execute()->fetchAll();

    $result = [
      'apenas teste' => 'teste',
    ];

    return new JsonResponse($result);
  }

}
