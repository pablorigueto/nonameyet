<?php

namespace Drupal\find_checkin\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\node\Entity\Node;
use Drupal\Core\Language\LanguageManagerInterface;
use Drupal\Core\Url;
use Drupal\find_checkin\Haversine;
use Symfony\Component\HttpFoundation\Request;

class NearLocation extends ControllerBase {

    /**
     * The Request Stack service.
     *
     * @var Symfony\Component\HttpFoundation\RequestStack
     */
    protected $requestStack;

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
     * {@inheritdoc}
     */
    public function __construct(
        RequestStack $requestStack,
        EntityTypeManagerInterface $entityTypeManager,
        LanguageManagerInterface $languageManager,
    ) {
        $this->requestStack = $requestStack;
        $this->entityTypeManager = $entityTypeManager;
        $this->languageManager = $languageManager;
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container): self
    {
        return new static(
            $container->get('request_stack'),
            $container->get('entity_type.manager'),
            $container->get('language_manager'),
        );
    }
  
    public function queryNearLocation(Request $request): JsonResponse {
        // Get the querys from url and check if have something near.
        $near_location = $this->getRequestUrl($request);
        return new JsonResponse($near_location);
    }

    /**
     * {@inheritdoc}
     */
    protected function getRequestUrl($request): mixed {
     
        $user_query = json_decode($request->getContent());

        $currentLatitude = $user_query->latitude;
        $currentLongitude = $user_query->longitude;
        $currentRange = $user_query->range;

        // $currentRequest = $this->requestStack->getCurrentRequest();
        // $currentLatitude = $currentRequest->request->get('latitude');
        // $currentLongitude = $currentRequest->request->get('longitude');
        // $currentRange = $currentRequest->request->get('range');
        if (!empty($currentLatitude) && !empty($currentLongitude)) {

            return $this->dbNearLocation($currentLatitude, $currentLongitude, $currentRange);

        }
    }

    /**
     * {@inheritdoc}
     */
    protected function dbNearLocation(float $currentLatitude, float $currentLongitude, int $currentRange)
    {

        $nodes = $this->getAllNodes();
        // Early return to nodes.
        if (empty($nodes)) {
          return false;
        }

        $langcode = $this->currentLanguage();

        // Calculate the distance in km.
        $radius = $currentRange;

        $all_init_results = [];
        // To store all the value published.
        foreach ($nodes as $node) {
            // If the node didn't have translation, get the default language.
            $field = $this->getTranslationField($node, $langcode);
            if ($field == false) {
                $field = $node;
            }

            // Get the coordinates from each node.
            $field_coordinates = $field->get('field_coordinates')->getValue()[0]['value'];

            $field_coordinates = explode(',', $field_coordinates);

            $result_distance = Haversine::distance($currentLatitude, $currentLongitude, trim($field_coordinates[0]), trim($field_coordinates[1]));

            $field_address = $node->get('field_address')[0];

            $pathAlias = $this->getPathAlias($node->id());

            if ($result_distance <= $radius) {
                $all_init_results[] = [
                    'pathAlias' => $pathAlias,
                    'title' => $node->getTitle(),
                    'address' => $field_address->address_line1,
                    'number' => $field_address->address_line2,
                    'neighborhood' => $field_address->dependent_locality,
                    'city' => $field_address->locality,
                    'state' => $field_address->administrative_area,
                    'distance' => intval($result_distance)
                ];
                
            }
        }
        return $all_init_results;
    }



    /**
     * {@inheritdoc}
     */
    public function currentLanguage(): string
    {
        return $this->languageManager->getCurrentLanguage()->getId();
    }

    /**
     * {@inheritdoc}
     */
    public function getTranslationField(Node $node, string $langcode): Node|bool
    {
        if ($node->hasTranslation($langcode)) {
            return $node->getTranslation($langcode);
        }
        return false;
    }

    /**
     * {@inheritdoc}
     */
    public function getStorageNode(): object
    {
        return $this->entityTypeManager->getStorage('node');
    }

    /**
     * {@inheritdoc}
     */
    public function getAllNodes(): array
    {
        // Load the nodes.
        $node_storage = $this->getStorageNode();
        return $node_storage->loadByProperties(
            [
            'type' => 'site_address',
            'status' => 1,
            ]
        );
    }

    /**
     * Get the path alias through the node id.
     */
    public function getPathAlias(int $node_id): string {
        // Get the URL object for the node using its ID.
        $url = Url::fromRoute('entity.node.canonical', ['node' => $node_id]);
        // Get the path alias from the URL object.
        return $url->toString();
    }

}
