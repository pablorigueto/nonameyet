<?php

namespace Drupal\find_checkin\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\node\Entity\Node;
use Drupal\Core\Language\LanguageManagerInterface;

class NearLocation extends ControllerBase
{

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
  
    public function queryNearLocation(): JsonResponse
    {
        // Get the querys from url and check if have something near.
        $near_location = $this->getRequestUrl();
        return new JsonResponse($near_location);
    }

    /**
     * {@inheritdoc}
     */
    protected function getRequestUrl(): array
    {
        $currentRequest = $this->requestStack->getCurrentRequest();
        $currentLatitude = $currentRequest->request->get('latitude');
        $currentLongitude = $currentRequest->request->get('longitude');
        if (!empty($currentLatitude) && !empty($currentLongitude)) {

            return $this->dbNearLocation($currentLatitude, $currentLongitude);

        }
    }

    /**
     * {@inheritdoc}
     */
    protected function dbNearLocation(float $currentLatitude, float $currentLongitude)
    {

        $nodes = $this->getAllNodes();
        // Early return to nodes.
        if (empty($nodes)) {
            return false;
        }

        $langcode = $this->currentLanguage();

        // Calculate the distance in 50 km.
        $radius = 50;

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

            $result_distance = $this->haversine($currentLatitude, $currentLongitude, trim($field_coordinates[0]), trim($field_coordinates[1]));
            if ($result_distance <= $radius) {
                $all_init_results[] = [
                'title' => $node->getTitle(),
                ];
        
            }
        }
        return $all_init_results;
    }

    // Haversine formula to calculate distance between two sets of coordinates
    public function haversine($lat1, $lon1, $lat2, $lon2)
    {
        $r = 6371; // Earth's radius in km
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
        $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon/2) * sin($dLon/2);
        $c = 2 * atan2(sqrt($a), sqrt(1-$a));
        $d = $r * $c;
        return $d;
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

}
