<?php

namespace Drupal\find_checkin\Controller;

use Drupal\Core\Controller\ControllerBase;

class CountryPhoneCode extends ControllerBase {

  function getPhoneCode($country_code) {
    switch ($country_code) {
      case 'US':
      case 'CA':
          return '+1';
      case 'GB':
          return '+44';
      case 'AU':
          return '+61';
      case 'NZ':
          return '+64';
      case 'JP':
          return '+81';
      case 'CN':
          return '+86';
      case 'KR':
          return '+82';
      case 'MX':
          return '+52';
      case 'ES':
          return '+34';
      case 'FR':
          return '+33';
      case 'DE':
          return '+49';
      case 'IT':
          return '+39';
      case 'NL':
          return '+31';
      case 'PT':
          return '+351';
      case 'RU':
          return '+7';
      case 'BR':
          return '+55';
      case 'AR':
          return '+54';
      case 'CL':
          return '+56';
      case 'CO':
          return '+57';
      case 'PE':
          return '+51';
      case 'VE':
          return '+58';
      case 'EG':
          return '+20';
      case 'SA':
          return '+966';
      case 'ZA':
          return '+27';
      case 'NG':
          return '+234';
      default:
          return '';
    }
  }

}
