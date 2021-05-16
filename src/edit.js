/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { RichText, InnerBlocks, AlignmentToolbar, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl, RangeControl, __experimentalUnitControl as UnitControl, ColorPalette, FontSizePicker, __experimentalRadioGroup as RadioGroup, __experimentalRadio as Radio } from '@wordpress/components';
import { useRef, useEffect } from 'react';

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

	const { titleIcon, titleIconAnimation, border, borderColor, borderRadius, borderThick, alignment, titleFontSize, titleBorder, content} = attributes;

	const changeAlignment = newAlignment => {
		setAttributes( { alignment: newAlignment === undefined ? 'center' : newAlignment } );
	}

	const iconRef = useRef();

	const setIconAnimation = (titleIconAnimation) => {
		setAttributes({ titleIconAnimation });
	}

	/* Manage Border Display Property */
	useEffect(() => {
		if(titleIcon === 'none') {
			iconRef.current.style = 'display: none';
		} else {
			iconRef.current.style = 'display: block';
		}
	}, [titleIcon]);




	/*
	const units = [
		{ value: 'px', label: 'px', default: 0 },
		{ value: 'em', label: 'em', default: 0 },
		{ value: 'rem', label: 'rem', default: 0 }
	];*/

	const colors = [
		{ name: __('Black'), color: '#000' },
		{ name: __('Dark Grey'), color: '#333' },
		{ name: __('Bright Grey'), color: '#121212' },
		{ name: __('White'), color: '#FFF' },
		{ name: __('Light Red'), color: '#FF665A' },
		{ name: __('Light Green'), color: '#e0fab7' },
		{ name: __('Light Blue'), color: '#6593A6' }
	];

	const fontSizes = [
		{ name: __('small'), slug: 'small', size: 12 },
		{ name: __('medium'), slug: 'medium', size: 16 },
		{ name: __('large'), slug: 'large', size: 22 },
		{ name: __('extra large'), slug: 'extra-large', size: 26 }
	];

	return (
		<div style={ { borderRadius, borderColor, borderWidth: border === true ? `${borderThick}px` : '1px' } } className="devfle-expansion-panel">
			<div style={ { borderColor, flexDirection: titleIcon } } className={ `devfle-expansion-panel__title devfle-expansion-panel__title--border-${titleBorder}` }>
				{
					<BlockControls>
						<AlignmentToolbar value={ alignment } onChange={ changeAlignment } />
					</BlockControls>
				}
				{
					<InspectorControls>
						<PanelBody initialOpen={ false } title={ __('Title Settings') }>
							<FontSizePicker value={ titleFontSize } onChange={ titleFontSize => setAttributes({titleFontSize}) } fontSizes={ fontSizes } fallbackFontSize={ 16 }></FontSizePicker>
							<RadioGroup className="devfle-radio-group" label={ __('Icon Position') } checked={ titleIcon } onChange={ titleIcon => setAttributes({ titleIcon }) }>
								<Radio value="row">left</Radio>
								<Radio value="row-reverse">right</Radio>
								<Radio value="none">none</Radio>
							</RadioGroup>
							<ToggleControl onChange={ setIconAnimation } checked={ titleIconAnimation } label={ __('Icon Animation') } ></ToggleControl>
						</PanelBody>
						<PanelBody initialOpen={ false } title={ __('Border Settings') }>
							<ToggleControl checked={ border } label={ __('Display Block Border') } onChange={ border => setAttributes({ border }) } ></ToggleControl>
							<ToggleControl checked={ titleBorder } label={ __('Display Title Border') } onChange={ titleBorder => setAttributes({ titleBorder }) } ></ToggleControl>
							<RangeControl value={ borderRadius } onChange={ borderRadius => setAttributes({ borderRadius }) } min={ 0 } max={ 60 }  label={ __('Border Radius (px)') }></RangeControl>
							<RangeControl value={ borderThick } onChange={ borderThick => setAttributes({ borderThick }) } min={ 1 } max={ 20 }  label={ __('Border Thickness (px)') }></RangeControl>
							<ColorPalette value={ borderColor } colors={ colors } onChange={ borderColor => setAttributes({ borderColor }) }></ColorPalette>
						</PanelBody>
						{/*
						<PanelBody  initialOpen={ false } title={ __('Block Spacing') }>
							<UnitControl units={ units } label={ __('Block Margin') }></UnitControl>
							<PanelRow>
								<UnitControl className="unitcontrol--space-right" units={ units } label={ __('Title Padding') }></UnitControl>
								<UnitControl className="unitcontrol--space-left" units={ units } label={ __('Content Padding') }></UnitControl>
							</PanelRow>
						</PanelBody>
						*/}
					</InspectorControls>
				}
				<div ref={iconRef} className={ `devfle-expansion-panel__icon devfle-expansion-panel__icon--animation-${titleIconAnimation}` }></div>
				<RichText
					style={ { textAlign: alignment, fontSize: titleFontSize } }
					tagName="p"
					value={content}
					onChange={(content) => setAttributes({ content })}
					placeholder={__('Your Title')} />
			</div>
			<div className="devfle-expansion-panel__content">
				<InnerBlocks />
			</div>
		</div>
	);
}
