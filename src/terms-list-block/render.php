<?php
/**
 * @psalm-var array $attributes
 * @psalm-var string $content
 * @psalm-var WP_Block $block
 */

// phpcs:disable WordPress.WP.GlobalVariablesOverride.Prohibited

defined( 'ABSPATH' ) || exit;

$query = new WP_Query( [
	'post_type'      => 'term',
	'posts_per_page' => -1,
	'post_status'    => 'publish',
	'orderby'        => 'title',
	'order'          => 'ASC',
] );

$terms = [];
while ( $query->have_posts() ) {
	$query->the_post();
	$data = [
		'id'          => get_the_ID(),
		'title'       => get_the_title(),
		'description' => get_the_content(),
		'permalink'   => get_the_permalink(),
	];

	$letter             = mb_substr( $data['title'], 0, 1, 'UTF-8' );
	$letter             = mb_strtoupper( $letter, 'UTF-8' );
	$terms[ $letter ][] = $data;
}

wp_reset_postdata();
?>
<?php /* phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped */ ?>
<div <?= get_block_wrapper_attributes(); ?>>
<?php foreach ( $terms as $letter => $items ) : ?>
	<section class="terms__section">
		<h2 class="terms__letter"><?= esc_html( $letter ); ?></h2>
		<dl class="terms__list">
			<?php foreach ( $items as $item ) : ?>
				<dt class="terms__title">
					<a href="<?= esc_url( $item['permalink'] ); ?>" class="terms__link"><?php echo esc_html( $item['title'] ); ?></a>
				</dt>
				<dd class="terms__description">
					<?= wp_kses_post( $item['description'] ); ?>
				</dd>
			<?php endforeach; ?>
		</dl>
	</section>
<?php endforeach; ?>
</div>
