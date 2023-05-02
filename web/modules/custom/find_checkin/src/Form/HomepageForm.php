<?php

namespace Drupal\find_checkin\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a form to define a personal values.
 */
class HomepageForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'homepage_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $form = [
      'my_container' => [
        '#type' => 'container',
        '#attributes' => ['class' => 'my-container-class'],
        'my_title' => [
          '#type' => 'html_tag',
          '#tag' => 'h5',
          '#value' => $this->t('Find places that pets are welcome!'),
          '#attributes' => ['class' => ['home-title']],
        ],
        'intro_container' => [
          '#type' => 'container',
          '#attributes' => [
            'class' => 'intro-container',
            'id' => 'content-main-react'
          ],
        ],
      ],
    ];

    return $form;

  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state): void {

  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {

  }

}
