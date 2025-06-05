import { type BlockConfiguration, registerBlockType } from '@wordpress/blocks';
import { Edit } from './edit';
import type { DocPdfEmbedAttributes } from './types';
import metadata from './block.json';

import './style.scss';

registerBlockType< DocPdfEmbedAttributes >(
	metadata as BlockConfiguration< DocPdfEmbedAttributes >, {
	edit: Edit,
} );
