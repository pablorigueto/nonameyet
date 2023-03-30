<?php

namespace Drupal\find_checkin\Form;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Provides a form to define a personal values.
 */
class LocationFormApi extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'locationFormApi';
  }

  /**
   * {@inheritdoc}
   */
  // public function buildForm(array $form, FormStateInterface $form_state) {
  //   $latitude = $_POST['latitude'];
  //   // $longitude = $_POST['longitude'];

  //   $form['form'] = [
  //     '#type' => 'fieldset',
  //     '#tag' => 'div',
  //     '#label' => $latitude,
  //     '#value' => 655,
  //     '#attributes' => [
  //       'class' => ['xablau'],
  //     ],
  //   ];

  //   return $form;

  // }
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Create the textfield with an empty value by default
    $form['new_field'] = [
      '#type' => 'textfield',
      '#title' => 'New Field',
      '#default_value' => '',
      '#ajax' => [
        'callback' => '::setNewFieldValue',
        'event' => 'change',
        'wrapper' => 'new-field-wrapper',
      ],
      '#prefix' => '<div id="new-field-wrapper">',
      '#suffix' => '</div>',
    ];
  
    return new JsonResponse($form);
 
  }
  
  public function setNewFieldValue(array &$form, FormStateInterface $form_state) {

    $response = new AjaxResponse();
    $response->addCommand(new HtmlCommand('#new-field-wrapper', $form['new_field']));
  
    // Set the value of the textfield to the retrieved data
    $form['new_field']['#value'] = 'test';
  
    return $response;
  }

      // // Retrieve data from the database using Drupal's database API.
    // $query = $this->database->select('va_evaluation', 'cpe');
    // $query->fields('cpe');
    // // Add a WHERE clause to the query to filter by user.
    // $query->condition('cpe.user', $current_user_id, '=');
    // // Add an ORDER BY clause to sort by create time in descending order.
    // $query->orderBy('cpe.create_time', 'DESC');
    // // Limit the number of results to 1.
    // // $query->range(0, 1);.
    // $result = $query->execute()->fetchAll();

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state): void {
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    // Get the latitude and longitude values from the AJAX call.

  }

}