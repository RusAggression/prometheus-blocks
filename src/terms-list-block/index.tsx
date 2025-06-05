import { type BlockConfiguration, registerBlockType } from '@wordpress/blocks';
import { Edit } from './edit';
import metadata from './block.json';

import './style.scss';

registerBlockType(
	metadata as BlockConfiguration<{}>, {
	edit: Edit,
} );
