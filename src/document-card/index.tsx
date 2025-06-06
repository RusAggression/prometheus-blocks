import { type BlockConfiguration, registerBlockType } from '@wordpress/blocks';
import { Edit } from './edit';
import type { DocumentCardAttributes } from './types';
import metadata from './block.json';

import './style.scss';

registerBlockType< DocumentCardAttributes >(
	metadata as BlockConfiguration< DocumentCardAttributes >,
	{
		edit: Edit,
	}
);
