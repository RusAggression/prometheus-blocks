<?php
// This file is generated. Do not modify it manually.
return array(
	'database-card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prometheus/database-card',
		'title' => 'Database Card Block',
		'category' => 'widgets',
		'icon' => 'database',
		'description' => 'Display a database entry as a card.',
		'supports' => array(
			'html' => false
		),
		'usesContext' => array(
			'postId'
		),
		'attributes' => array(
			
		),
		'textdomain' => 'prom-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'doc-pdf-embed' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prometheus/doc-pdf-embed',
		'title' => 'PDF Embed Block for Document CPT',
		'category' => 'media',
		'icon' => 'media-document',
		'description' => 'Displays the PDF document attached to the Document.',
		'supports' => array(
			'anchor' => true,
			'align' => true,
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'color' => array(
				'text' => false,
				'link' => true,
				'gradients' => true
			),
			'interactivity' => true
		),
		'attributes' => array(
			'downloadLabel' => array(
				'type' => 'string',
				'default' => 'Download document'
			),
			'previewHeight' => array(
				'type' => 'number',
				'default' => 600
			)
		),
		'textdomain' => 'prom-blocks',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php',
		'style' => 'file:./style-index.css'
	),
	'document-card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prometheus/document-card',
		'title' => 'Document Card Block',
		'category' => 'media',
		'icon' => 'media-document',
		'description' => 'Displays a Document as a card',
		'supports' => array(
			'anchor' => true,
			'align' => true,
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'link' => true,
				'gradients' => true
			),
			'shadow' => true,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalFontStyle' => true,
				'__experimentalFontWeight' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalTextTransform' => true,
				'__experimentalWritingMode' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			)
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'right'
			),
			'documentId' => array(
				'type' => 'number',
				'default' => 0
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Document'
			),
			'readMore' => array(
				'type' => 'string',
				'default' => 'Read more…'
			),
			'width' => array(
				'type' => 'string',
				'default' => '25%'
			)
		),
		'textdomain' => 'prom-blocks',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php',
		'style' => 'file:./style-index.css'
	),
	'terms-list-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'prometheus/term-list',
		'title' => 'Term List Block',
		'category' => 'widgets',
		'icon' => 'tag',
		'description' => 'Display term list.',
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			
		),
		'textdomain' => 'prom-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
