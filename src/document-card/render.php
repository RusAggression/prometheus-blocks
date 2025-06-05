<?php
/**
 * @psalm-var array $attributes
 * @psalm-var string $content
 * @psalm-var WP_Block $block
 */

// phpcs:disable WordPress.WP.GlobalVariablesOverride.Prohibited -- local scope
// phpcs:disable WordPress.Arrays.ArrayDeclarationSpacing.AssociativeArrayFound -- for readability

defined( 'ABSPATH' ) || exit;

$post_id   = (int) $attributes['documentId'];
$post_type = get_post_type( $post_id );
if ( 'document' !== $post_type ) {
	return '';
}

$doc_id = get_post_meta( $post_id, '_document_doc_id', true );
if ( ! $doc_id ) {
	return '';
}

$url = wp_get_attachment_url( (int) $doc_id );
if ( ! $url ) {
	return '';
}

$block_title = $attributes['title'] ?? __( 'Document', 'prom-blocks' );
$read_more   = $attributes['readMore'] ?? __( 'Read more', 'prom-blocks' );
$title       = get_the_title( $post_id );
?>
<?php /* phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped */ ?>
<div <?= get_block_wrapper_attributes( [ 'class' => 'document-card', 'style' => "width: {$attributes['width']};" ] ); ?>>
<?php if ( $block_title ) : ?>
	<h2 class="document-card__title">
		<a href="<?= esc_url( $url_link ); ?>" class="document-card__link" target="_blank" rel="noopener noreferrer"><?php echo esc_html( $block_title ); ?></a>
	</h2>
<?php endif; ?>
	<div class="document-card__description">
		<p><?= esc_html( $title ); ?></p>
<?php if ( $read_more ) : ?>
		<p class="document-card__read-more">
			<a href="<?= esc_url( $url ); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html( $read_more ); ?></a>
		</p>
<?php endif; ?>
	</div>
</div>
