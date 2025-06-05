<?php

namespace RusAggression\Blocks;

final class Plugin {
	/** @var self|null */
	private static $instance;

	public static function get_instance(): self {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct() {
		add_action( 'init', [ $this, 'init' ] );
	}
	
	public function init(): void {
		load_plugin_textdomain( 'prom-blocks', false, dirname( plugin_basename( __DIR__ ) ) . '/lang' );

		$path     = __DIR__ . '/../build';
		$manifest = $path . '/blocks-manifest.php';

		wp_register_block_types_from_metadata_collection( $path, $manifest );
	}
}
