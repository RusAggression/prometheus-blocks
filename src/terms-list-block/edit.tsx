import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import type { BlockEditProps } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { decodeEntities } from '@wordpress/html-entities';

import './editor.scss';

interface Term {
	id: number;
	link: string;
	title: {
		rendered: string;
	};
	content: string;
}

export function Edit() {
	const blockProps = useBlockProps();

	const terms = useSelect( ( select ) => {
		const query = {
			postType: 'term',
			perPage: -1,
			status: 'publish',
			orderby: 'title',
			order: 'asc',
		};

		const coreSelect = select( 'core' ) as any;
		return coreSelect.getEntityRecords( 'postType', 'term', query );
	}, [] ) as Term[] | undefined;

	const groupedTerms =
		terms?.reduce(
			( acc, term ) => {
				const letter =
					term.title?.rendered?.charAt( 0 ).toUpperCase() ?? '';
				acc[ letter ] ??= [];
				acc[ letter ].push( term );
				return acc;
			},
			{} as Record< string, Term[] >
		) ?? {};

	if ( ! terms ) {
		return (
			<div { ...blockProps }>
				<p>{ __( 'Loading terms...', 'prom-blocks' ) }</p>
			</div>
		);
	}

	return (
		<div { ...blockProps }>
			{ Object.keys( groupedTerms || {} )
				.sort( ( a, b ) => a.localeCompare( b ) )
				.map( ( letter ) => (
					<section key={ letter } className="terms__section">
						<h2 className="terms__letter">{ letter }</h2>
						<dl className="terms__list">
							{ groupedTerms[ letter ].map( ( term ) => (
								<Fragment key={ term.id }>
									<dt className="terms__title">
										<a
											href={ term.link }
											className="terms__link"
										>
											{ decodeEntities(
												term.title.rendered
											) }
										</a>
									</dt>
									<RichText.Content
										tagName="dd"
										className="terms__description"
										value={ term.content }
									/>
								</Fragment>
							) ) }
						</dl>
					</section>
				) ) }
		</div>
	);
}
