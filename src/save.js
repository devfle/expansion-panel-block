/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
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
export default function save( { attributes } ) {
	const {
		titleIcon,
		titleIconAnimation,
		border,
		borderColor,
		borderRadius,
		borderThick,
		alignment,
		titleFontSize,
		titleBorder,
		content,
		borderThickTitle,
		textColor,
	} = attributes;

	const wrapperStyles = {
		borderRadius,
		borderColor,
		borderWidth: border === true ? `${ borderThick }px` : '0px',
	};

	const titleStyles = {
		color: textColor,
		borderColor,
		borderBottomWidth: `${ borderThickTitle }px`,
	};

	return (
		<div style={ { ...wrapperStyles } } className="devfle-expansion-panel">
			<div
				style={ { ...titleStyles } }
				className={ `devfle-expansion-panel__title devfle-expansion-panel__title--border-${ titleBorder } devfle-expansion-panel--icon-${ titleIcon }` }
			>
				<div
					className={ `devfle-expansion-panel__icon devfle-expansion-panel__icon--animation-${ titleIconAnimation }` }
				>
					<svg
						aria-hidden="true"
						focusable="false"
						data-prefix="fas"
						data-icon="chevron-down"
						className="svg-inline--fa fa-chevron-down fa-w-14"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
					>
						<path
							fill="currentColor"
							d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
						></path>
					</svg>
				</div>
				<RichText.Content
					style={ { fontSize: titleFontSize } }
					className={ `devfle-expansion-panel--${ alignment }` }
					tagName="p"
					value={ content }
				/>
			</div>
			<div className="devfle-expansion-panel__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
