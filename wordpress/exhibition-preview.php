<?php
if (is_user_logged_in()):
  require_once('exhibition-data-tags.php');
  $query = new WP_Query(array(
    'post_type' => 'gallery',
    'posts_per_page' => -1,
    'order_by' => 'menu_order',
    'meta_query' => array(
      array(
        'key' => 'preview_as_admin',
        'value' => true,
        'compare' => '='
      )
    )
  ));
  wp_reset_postdata();
  if ($query->have_posts()):
    while ($query->have_posts()):
      $query->the_post(); ?>

  <div class='exhibition exhibition--archive'>
    <?php getExhibitionDataTags(get_fields()); ?>
  </div>

  <?php
    endwhile;
  endif;
endif; ?>
