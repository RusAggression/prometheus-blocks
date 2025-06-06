import { __ } from '@wordpress/i18n';
import { type BlockEditProps } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { decodeEntities } from '@wordpress/html-entities';

import './editor.scss';

export function Edit( {
	context,
}: Readonly< BlockEditProps< {} > > ): JSX.Element {
	const blockProps = useBlockProps( {
		className: 'database-card',
	} );

	const postId = context?.postId;
	const post = useSelect(
		( select ) => {
			if ( ! postId ) {
				return null;
			}

			const coreSelect = select( 'core' ) as any;
			return coreSelect.getEntityRecord( 'postType', 'database', postId );
		},
		[ postId ]
	);

	const featuredMedia = useSelect(
		( select ) => {
			if ( ! post?.featured_media ) {
				return null;
			}

			const coreSelect = select( 'core' ) as any;
			return coreSelect.getEntityRecord(
				'postType',
				'attachment',
				post.featured_media
			);
		},
		[ post?.featured_media ]
	);

	const title = post?.title?.rendered
		? decodeEntities( post.title.rendered )
		: '';
	const sourceLink = post?.meta?._database_source_link ?? '#';
	const description = post?.content?.rendered;

	if ( ! postId ) {
		return (
			<div { ...blockProps }>
				<p>
					{ __(
						'Database Card Block - Add this block inside a Post Template',
						'database-cpt'
					) }
				</p>
			</div>
		);
	}

	return (
		<div { ...blockProps }>
			{ featuredMedia && (
				<div className="database-card__image">
					<a
						href={ sourceLink }
						className="database-card__link"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src={ featuredMedia.source_url }
							alt={ featuredMedia.alt_text ?? title }
							className="wp-post-featured-image"
						/>
					</a>
				</div>
			) }
			<h2 className="database-card__title">
				<a
					href={ sourceLink }
					className="database-card__link"
					target="_blank"
					rel="noopener noreferrer"
				>
					{ title }
				</a>
			</h2>
			{ description && (
				<RichText.Content
					tagName="div"
					className="database-card__description"
					value={ description }
				/>
			) }
		</div>
	);
}
