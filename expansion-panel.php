<?php
/**
 * Plugin Name:     Expansion Panel for Gutenberg
 * Description:     Adds an Expansion Panel Block to your Gutenberg Editor.
 * Version:         1.0.0
 * Author:          Devfle
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     expansion-panel
 *
 * @package         create-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_block_expansion_panel_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "create-block/expansion-panel" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'create-block-expansion-panel-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'create-block-expansion-panel-block-editor', 'expansion-panel' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'create-block-expansion-panel-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-expansion-panel-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'create-block/expansion-panel', array(
		'editor_script' => 'create-block-expansion-panel-block-editor',
		'editor_style'  => 'create-block-expansion-panel-block-editor',
		'style'         => 'create-block-expansion-panel-block',
	) );
}
add_action( 'init', 'create_block_expansion_panel_block_init' );


add_action('wp_enqueue_scripts', function() {
	$SCRIPT_NAME = 'ep-frontend';
	$SCRIPT_PATH = 'build/frontend.js';

	wp_register_script($SCRIPT_NAME, plugins_url( $SCRIPT_PATH, __FILE__ ), [], true, true );
	wp_enqueue_script($SCRIPT_NAME);
});
