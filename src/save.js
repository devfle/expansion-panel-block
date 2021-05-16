/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { RichText, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const { titleIcon, titleIconAnimation, border, borderColor, borderRadius, borderThick, alignment, titleFontSize, titleBorder, content} = attributes;

	return (
		<div style={ { borderRadius, borderColor, borderWidth: border === true ? `${borderThick}px` : '1px' } } className="devfle-expansion-panel">
			<div style={ { borderColor } } className={`devfle-expansion-panel__title devfle-expansion-panel__title--border-${titleBorder} devfle-expansion-panel--icon-${titleIcon}`}>
				<div className={ `devfle-expansion-panel__icon devfle-expansion-panel__icon--animation-${titleIconAnimation}` }></div>
				<RichText.Content style={ { fontSize: titleFontSize } } className={ `devfle-expansion-panel--${ alignment }` } tagName="p" value={content} />
			</div>
			<div className="devfle-expansion-panel__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
