<?php

namespace Drupal\find_checkin\Form;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\RedirectCommand;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Entity\EntityViewBuilderInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface as DependencyInjectionContainerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Language\LanguageManagerInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\path_alias\AliasManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\Core\Database\Connection;
use Drupal\Core\Url;
use Drupal\find_checkin\Haversine;

/**
 * Provides a form to define a personal values.
 */
class HomepageForm extends FormBase {

  /**
   * The entity view builder.
   *
   * @var \Drupal\Core\Entity\EntityViewBuilderInterface
   */
  protected $entityViewBuilder;

  /**
   * The messenger service.
   *
   * @var \Drupal\Core\Messenger\MessengerInterface
   */
  protected $messenger;

  /**
   * The Entity Type Manager Interface.
   *
   * @var Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The Language Manager Interface.
   *
   * @var Drupal\Core\Language\LanguageManagerInterface
   */
  protected $languageManager;

  /**
   * The current user.
   *
   * @var \Drupal\Core\Session\AccountInterface
   */
  protected $currentUser;

  /**
   * The Request Stack service.
   *
   * @var Symfony\Component\HttpFoundation\RequestStack
   */
  protected $requestStack;

  /**
   * The Alias ManagerInterface.
   *
   * @var Drupal\path_alias\AliasManagerInterface
   */
  protected $aliasManager;

  /**
   * The entity repository service.
   *
   * @var \Drupal\Core\Entity\EntityRepositoryInterface
   */
  protected $entityRepository;

  /**
   * The Drupal database.
   *
   * @var Drupal\Core\Database\Connection
   */
  protected $database;

  /**
   * {@inheritdoc}
   */
  public function __construct(
    EntityViewBuilderInterface $entity_view_builder,
    MessengerInterface $messenger,
    EntityTypeManagerInterface $entityTypeManager,
    LanguageManagerInterface $languageManager,
    AccountInterface $currentUser,
    RequestStack $requestStack,
    AliasManagerInterface $aliasManager,
    EntityRepositoryInterface $entity_repository,
    Connection $database,
    ) {
    $this->entityViewBuilder = $entity_view_builder;
    $this->messenger = $messenger;
    $this->entityTypeManager = $entityTypeManager;
    $this->languageManager = $languageManager;
    $this->currentUser = $currentUser;
    $this->requestStack = $requestStack;
    $this->aliasManager = $aliasManager;
    $this->entityRepository = $entity_repository;
    $this->database = $database;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(DependencyInjectionContainerInterface $container): self {
    return new static(
      $container->get('entity_type.manager')->getViewBuilder('node'),
      $container->get('messenger'),
      $container->get('entity_type.manager'),
      $container->get('language_manager'),
      $container->get('current_user'),
      $container->get('request_stack'),
      $container->get('path_alias.manager'),
      $container->get('entity.repository'),
      $container->get('database'),
    );
  }

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

    // Add a text above the rendered nodes.
    // $form['select_field'] = [
    //   '#type' => 'select',
    //   '#title' => $this->t('Range'),
    //   '#options' => [
    //     50 => '50 km',
    //     100 => '100 km',
    //     150 => '150 km',
    //     200 => '200 km',
    //     250 => '250 km',
    //     300 => '300 km',
    //   ],
    //   '#attributes' => [
    //     'class' => ['range'],
    //   ]
    //   // '#ajax' => [
    //   //   'callback' => [$this, 'getNewRange'],
    //   //   'event' => 'change',
    //   // ],
    // ];



    //return $form;
  }

  /**
   * Select company change.
   *
   * @param array $form
   *   The form definition.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The form state.
   *
   * @return \Drupal\Core\Ajax\AjaxResponse
   *   An AJAX response to replace content after change the select.
   */
  public function getNewRange(array &$form, FormStateInterface $form_state) {//: AjaxResponse {

    // $test_id = $form_state->getValue('select_field');
    // $response = new AjaxResponse();
    // $response->addCommand(new RedirectCommand($url->toString()));
    // return $response;

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
