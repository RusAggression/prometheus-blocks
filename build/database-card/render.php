<?php
/**
 * @psalm-var array $attributes
 * @psalm-var string $content
 * @psalm-var WP_Block $block
 */

// phpcs:disable WordPress.WP.GlobalVariablesOverride.Prohibited

defined( 'ABSPATH' ) || exit;

$post_id     = (int) $block->context['postId'];
$title       = get_the_title( $post_id );
$source_link = get_post_meta( $post_id, '_database_source_link', true );
$description = get_the_content( $post_id );
?>
<?php /* phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped */ ?>
<div <?= get_block_wrapper_attributes( [ 'class' => 'database-card' ] ); ?>>
<?php if ( has_post_thumbnail( $post_id ) ) : ?>
	<div class="database-card__image"><a href="<?= esc_url( $source_link ); ?>" class="database-card__link" target="_blank" rel="noopener noreferrer"><?php echo get_the_post_thumbnail( $post_id, 'database-thumbnail' ); ?></a></div>
<?php endif; ?>
	<h2 class="database-card__title">
		<a href="<?= esc_url( $source_link ); ?>" class="database-card__link" target="_blank" rel="noopener noreferrer"><?php echo esc_html( $title ); ?></a>
	</h2>
<?php if ( $description ) : ?>
	<div class="database-card__description"><?= wp_kses_post( $description ); ?></div>
<?php endif; ?>
</div>
