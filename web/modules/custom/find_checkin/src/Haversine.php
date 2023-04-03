<?php

namespace Drupal\find_checkin;

class Haversine {

  // Haversine formula to calculate distance between two sets of coordinates.
  public static function distance($lat1, $lon1, $lat2, $lon2) {
    // // Earth's radius in km;
    $r = 6371;
    // Convert latitude difference to radians.
    $dLat = deg2rad($lat2 - $lat1);
    // Convert longitude difference to radians.
    $dLon = deg2rad($lon2 - $lon1);
    // Calculate the first part of the Haversine formula.
    $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon/2) * sin($dLon/2);
    // Calculate the second part of the Haversine formula
    $c = 2 * atan2(sqrt($a), sqrt(1-$a));
      // Calculate the final result (distance between two points on Earth).
    $d = $r * $c;
    // Return the distance.
    return $d;
  }

}
