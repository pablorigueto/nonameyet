<?php

namespace Drupal\find_checkin\Form;

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
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Drupal\Core\Database\Connection;
use Drupal\Core\Datetime\DrupalDateTime;
use Drupal\Core\Url;
use Drupal\node\Entity\Node;

/**
 * Provides a form to define a personal values.
 */
class HomepageForm extends FormBase
{

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
    public static function create(DependencyInjectionContainerInterface $container): self
    {
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
    public function getFormId(): string
    {
        return 'homepage_form';
    }

    /**
     * {@inheritdoc}
     */
    public function buildForm(array $form, FormStateInterface $form_state): array|bool
    {
 
        // Add a text above the rendered nodes.
        $form = [
        'intro_container' => [
        '#type' => 'container',
        '#attributes' => [
          'class' => 'intro-container',
        ],
        'intro_label' => [
          '#type' => 'item',
          '#markup' => '$fieldDetails[xablau]',
        ],
        'intro' => [
          '#type' => 'markup',
          '#markup' => '$fieldDetails[xablau]',
          '#attributes' => [
            'data-id' => '$evaluation_type',
          ],
        ],
        ],
        ];
 
        $form['submit'] = [
        '#type' => 'submit',
        '#value' => $this->t('Finish'),
        '#attributes' => [
        'disabled' => 'disabled',
        'name' => 'pva-submit',
        'data-id' => '$evaluation_type',
        ],
        '#prefix' => '<div class="pv-submit-class">',
        '#suffix' => '</div>',
        ];

        return $form;
    }

    /**
     * {@inheritdoc}
     */
    public function validateForm(array &$form, FormStateInterface $form_state): void
    {

    }

    /**
     * {@inheritdoc}
     */
    public function submitForm(array &$form, FormStateInterface $form_state): void
    {

    }
}
