<?php

namespace Drupal\Tests\geoip\Kernel;

use Drupal\KernelTests\KernelTestBase;

/**
 * Tests the default GeoLocator plugins.
 *
 * @group geoip
 */
class RequirementsTest extends KernelTestBase {

  /**
   * The file system.
   *
   * @var \Drupal\Core\File\FileSystemInterface
   *   A file system instance
   */
  protected $fileSystem;

  /**
   * {@inheritdoc}
   */
  public static $modules = [
    'system',
    'geoip',
    'file',
  ];

  /**
   * {@inheritdoc}
   */
  protected function setUp() {
    parent::setUp();
    $this->fileSystem = $this->container->get('file_system');
  }

  /**
   * Tests the requirements.
   */
  public function testRequirements() {
    module_load_install('geoip');

    $requirements = geoip_requirements('install');
    // Class is available due to build. No warnings.
    $this->assertTrue(!isset($requirements['geoip_local_database']['severity']));

    $requirements = geoip_requirements('runtime');
    $this->assertNotEmpty($requirements['geoip_local_database']['title']);
    $this->assertEquals($requirements['geoip_local_database']['severity'], REQUIREMENT_WARNING);

    $file = $this->fileSystem->copy(__DIR__ . '/../../fixtures/GeoLite2-Country.mmdb', 'public://GeoLite2-Country.mmdb');
    $requirements = geoip_requirements('runtime');
    $this->assertNotEmpty($requirements['geoip_local_database']['title']);
    $this->assertEquals($requirements['geoip_local_database']['severity'], REQUIREMENT_OK);

    touch($file);
    $this->assertNotEmpty($requirements['geoip_local_database_age']['title']);
    $this->assertEquals(REQUIREMENT_OK, $requirements['geoip_local_database_age']['severity']);

    touch($file, strtotime('2 months ago'));
    $requirements = geoip_requirements('runtime');
    $this->assertNotEmpty($requirements['geoip_local_database_age']['title']);
    $this->assertEquals(REQUIREMENT_WARNING, $requirements['geoip_local_database_age']['severity']);
  }

}
