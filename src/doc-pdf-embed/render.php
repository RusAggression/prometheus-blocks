<?php
/**
 * @psalm-var array $attributes
 * @psalm-var string $content
 * @psalm-var WP_Block $block
 */

// phpcs:disable WordPress.WP.GlobalVariablesOverride.Prohibited -- local scope

defined( 'ABSPATH' ) || exit;

if ( ! is_singular() ) {
	return '';
}

$height = (int) ( $attributes['previewHeight'] ?? 600 );
if ( ! $height || $height < 100 ) {
	$height = 600;
}

$label = $attributes['downloadLabel'] ?? __( 'Download document', 'prom-blocks' );

$post_id   = get_the_ID();
$post_type = get_post_type( $post_id );
if ( 'document' !== $post_type ) {
	return '';
}

$doc_id  = get_post_meta( $post_id, '_document_doc_id', true );
$url     = null;
$caption = null;
if ( $doc_id ) {
	$caption = wp_get_attachment_caption( (int) $doc_id );
	$url     = wp_get_attachment_url( (int) $doc_id );
}

if ( ! $doc_id || ! $url ) {
	return '';
}
?>
<?php /* phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped */ ?>
<div <?= get_block_wrapper_attributes( [ 'class' => 'doc-pdf-embed' ] ); ?>>
	<object class="doc-pdf-embed__embed" data="<?= esc_attr( $url ); ?>" type="application/pdf" style="width: 100%; height: <?= esc_attr( $height ); ?>px" aria-label="<?= esc_attr( $caption ); ?>"></object>
	<a href="<?= esc_url( $url ); ?>" class="doc-pdf-embed__button wp-element-button" download"><?= esc_html( $label ); ?></a>
</div>
