/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { useState, useEffect } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Spinner,
	Placeholder,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { type BlockEditProps } from '@wordpress/blocks';
import type { DocumentCardAttributes } from './types';
import { __ } from '@wordpress/i18n';

export function Edit(
	props: Readonly< BlockEditProps< DocumentCardAttributes > >
): JSX.Element {
	const { attributes, setAttributes } = props;
	const { documentId, readMore, title, width } = attributes;

	const [ searchQuery, setSearchQuery ] = useState( '' );
	const [ searchResults, setSearchResults ] = useState<
		Array< { id: number; title: { rendered: string }; link: string } >
	>( [] );
	const [ isSearching, setIsSearching ] = useState( false );
	const [ error, setError ] = useState< string | null >( null );

	const [ selectedPost, setSelectedPost ] = useState< any >( null );

	useEffect( () => {
		if ( ! documentId ) {
			setSelectedPost( null );
			return;
		}

		fetch( `/wp-json/wp/v2/documents/${ documentId }` )
			.then( ( response ) => {
				if ( ! response.ok ) {
					throw new Error(
						`Failed to fetch post: ${ response.statusText }`
					);
				}
				return response.json();
			} )
			.then( ( data ) => {
				setSelectedPost( data );
			} )
			.catch( () => {
				setSelectedPost( null );
			} );
	}, [ documentId, setSelectedPost ] );

	useEffect( () => {
		if ( ! searchQuery ) {
			setSearchResults( [] );
			return;
		}

		setIsSearching( true );
		setError( null );

		fetch(
			`/wp-json/wp/v2/documents?search=${ encodeURIComponent(
				searchQuery
			) }&per_page=20`
		)
			.then( ( response ) => {
				if ( ! response.ok ) {
					throw new Error(
						`Failed to fetch posts: ${ response.statusText }`
					);
				}
				return response.json();
			} )
			.then( ( data ) => {
				setSearchResults( data );
				setIsSearching( false );
			} )
			.catch( ( err ) => {
				setError( err.message );
				setIsSearching( false );
			} );
	}, [ searchQuery, setSearchResults, setError, setIsSearching ] );

	const dummyOnChange = () => {};
	const blockProps = useBlockProps( {
		className: 'document-card',
		style: { width },
	} );
	const onTitleChange = ( value: string ) =>
		setAttributes( { title: value } );
	const onReadMoreChange = ( value: string ) =>
		setAttributes( { readMore: value } );
	const onWidthChange = ( newWidth: string | undefined ) =>
		setAttributes( { width: newWidth ?? '25%' } );

	return (
		<>
			<InspectorControls>
				<PanelBody title="Post Settings" initialOpen={ true }>
					<TextControl
						label="Block title"
						value={ title }
						onChange={ onTitleChange }
					/>
					<TextControl
						label="Selected Document"
						value={
							selectedPost ? selectedPost.title.rendered : 'None'
						}
						readOnly
						onChange={ dummyOnChange }
					/>
					<TextControl
						label="Search Posts"
						value={ searchQuery }
						onChange={ ( value ) => setSearchQuery( value ) }
						placeholder="Search for a post..."
					/>
					{ isSearching && <Spinner /> }
					{ error && <p style={ { color: 'red' } }>{ error }</p> }
					{ searchResults.length > 0 && (
						<ul>
							{ searchResults.map( ( post ) => (
								/* eslint-disable-next-line */
								<li
									key={ post.id }
									style={ {
										cursor: 'pointer',
										padding: '5px 0',
										borderBottom: '1px solid #ddd',
									} }
									onClick={ () => {
										setAttributes( {
											documentId: post.id,
										} );
										setSearchQuery( '' );
										setSearchResults( [] );
									} }
								>
									{ post.title.rendered ||
										`Post #${ post.id }` }
								</li>
							) ) }
						</ul>
					) }
					<TextControl
						label="Read More Text"
						value={ readMore }
						onChange={ onReadMoreChange }
					/>
					<UnitControl
						label={ __( 'Width', 'prom-blocks' ) }
						onChange={ onWidthChange }
						value={ width }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ selectedPost ? (
					<>
						{ title && (
							<h2 className="document-card__title">
								<a
									href={ selectedPost.link }
									target="_blank"
									rel="noopener noreferrer"
								>
									{ title }
								</a>
							</h2>
						) }
						<div className="document-card__description">
							<p>{ selectedPost.title?.rendered }</p>
							{ readMore && (
								<p>
									<a
										href={ selectedPost.link }
										target="_blank"
										rel="noopener noreferrer"
									>
										{ readMore }
									</a>
								</p>
							) }
						</div>
					</>
				) : (
					<Placeholder>
						{ documentId
							? 'Loading post...'
							: 'Please select a post from the settings.' }
					</Placeholder>
				) }
			</div>
		</>
	);
}
