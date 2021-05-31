/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'devfle/expansion-panel', {
	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'Expansion Panel', 'expansion-panel' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __(
		'Hide your content inside a expansion panel. The panel opens on click.',
		'expansion-panel'
	),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
	 */
	category: 'design',

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: 'admin-page',

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
		spacing: {
			padding: true,
		},
	},

	example: {
		attributes: {
			content: 'Hello World',
		},
	},

	keywords: [
		__( 'expansion' ),
		__( 'panel' ),
		__( 'spoiler' ),
		__( 'hide' ),
		__( 'show' ),
	],

	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		alignment: {
			type: 'string',
			default: 'center',
		},
		border: {
			type: 'boolean',
			default: true,
		},
		borderRadius: {
			type: 'number',
			default: 4,
		},
		borderColor: {
			type: 'string',
			default: '#333',
		},
		titleFontSize: {
			type: 'number',
			default: 16,
		},
		titleIcon: {
			type: 'string',
			default: 'left',
		},
		titleIconAnimation: {
			type: 'boolean',
			default: true,
		},
		titleBorder: {
			type: 'boolean',
			default: true,
		},
		borderThick: {
			type: 'number',
			default: 1,
		},
		borderThickTitle: {
			type: 'number',
			default: 1,
		},
		textColor: {
			type: 'string',
			default: '#333',
		},
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );

const blockStyles = [ 'dashed', 'dotted' ];

for ( const blockStyle of blockStyles ) {
	wp.blocks.registerBlockStyle( 'devfle/expansion-panel', {
		name: `expansion-panel--${ blockStyle }`,
		label: `${ blockStyle } Border`,
	} );
}
