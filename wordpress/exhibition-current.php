<?php
require_once('exhibition-data-tags.php');
$now = date('Ymd', time());
$query = new WP_Query(array(
  'post_type' => 'gallery',
  'posts_per_page' => -1,
  'order_by' => 'menu_order',
  'meta_query' => array(
    'relation' => 'AND',
    array(
      'key' => 'start_date',
      'value' => $now,
      'compare' => '<='
    ),
    array(
      'key' => 'end_date',
      'value' => $now,
      'compare' => '>='
    )
  )
));
wp_reset_postdata();
if ($query->have_posts()):
  while ($query->have_posts()):
    $query->the_post(); ?>

    <div class='section section--featured'>
      <?php getExhibitionDataTags(get_fields()); ?>
    </div>

<?php
  endwhile;
endif;
?>
