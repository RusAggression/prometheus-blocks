import { BlockEditProps } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import type { DocPdfEmbedAttributes } from './types';

export function Edit( {
	attributes,
	setAttributes,
}: Readonly< BlockEditProps< DocPdfEmbedAttributes > > ) {
	const { downloadLabel, previewHeight } = attributes;
	const blockProps = useBlockProps( { className: 'doc-pdf-embed' } );

	const onDownloadLabelChange = ( value: string ) =>
		setAttributes( { downloadLabel: value } );
	const onPreviewHeightChange = ( value: string ) =>
		setAttributes( { previewHeight: parseInt( value, 10 ) } );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'prom-blocks' ) }>
					<TextControl
						label={ __( 'Download label', 'prom-blocks' ) }
						value={ downloadLabel }
						onChange={ onDownloadLabelChange }
					/>
					<TextControl
						label={ __( 'Preview height', 'prom-blocks' ) }
						type="number"
						value={ previewHeight }
						min={ 100 }
						onChange={ onPreviewHeightChange }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ __(
					'Attached document will be displayed here if available.',
					'prom-blocks'
				) }
			</div>
		</>
	);
}
