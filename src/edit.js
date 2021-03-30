/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { RichText, InnerBlocks, AlignmentToolbar, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl, RangeControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const changeAlignment = newAlignment => {
		setAttributes( { alignment: newAlignment === undefined ? 'center' : newAlignment } );
	}

	return (
		<div style={ {borderRadius: attributes.borderRadius} } className="devfle-expansion-panel">
			<div className="devfle-expansion-panel__title">
				{
					<BlockControls>
						<AlignmentToolbar value={ attributes.alignment } onChange={ changeAlignment } />
					</BlockControls>
				}
				{
					<InspectorControls>
						<PanelBody initialOpen={ false } title="Border Settings">
							<ToggleControl checked={ attributes.border } label="Display Border" onChange={ border => setAttributes({ border }) } ></ToggleControl>
							<RangeControl value={attributes.borderRadius } onChange={ borderRadius => setAttributes({ borderRadius }) } min={ 0 } max={ 30 }  label={ __('Border Radius (px)') }></RangeControl>
						</PanelBody>
						<PanelBody title={ __('Block Spacing') }>
							<UnitControl label={ __('Block Margin') }></UnitControl>
							<PanelRow>
								<UnitControl label={ __('Title Padding') }></UnitControl>
								<UnitControl label={ __('Content Padding') }></UnitControl>
							</PanelRow>
						</PanelBody>
					</InspectorControls>
				}
				<RichText
					style={ { textAlign: attributes.alignment } }
					tagName="p"
					value={attributes.content}
					onChange={(content) => setAttributes({ content })}
					placeholder={__('Your Title')} />
			</div>
			<div className="devfle-expansion-panel__content">
				<InnerBlocks />
			</div>
		</div>
	);
}
