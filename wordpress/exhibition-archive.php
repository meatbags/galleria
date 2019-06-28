<?php
require_once('exhibition-data-tags.php');
$now = date('Ymd', time());
$query = new WP_Query(array(
  'post_type' => 'gallery',
  'posts_per_page' => -1,
  'order_by' => 'menu_order',
  'meta_query' => array(
    array(
      'key' => 'end_date',
      'value' => $now,
      'compare' => '<'
    )
  )
));
wp_reset_postdata();
if ($query->have_posts()):
  while ($query->have_posts()):
    $query->the_post(); ?>

    <div class='section section--archive'>
      <?php getExhibitionDataTags(get_fields()); ?>
      <div class='section--archive__prompt'>
        Open
      </div>
    </div>

<?php
  endwhile;
endif;
?>
