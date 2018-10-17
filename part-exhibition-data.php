<?php
  // get active exhibition data
  $query = new wp_Query(array("post_type" => "gallery", "posts_per_page" => -1, "order_by" => "menu_order"));
  $timeNow = time();
  $complete = false;
  $images = false;
  $adminImages = false;
  $loggedIn = is_user_logged_in();

  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();
      if (!$complete) {
        $start = get_field('start_date');
        $end = get_field('end_date');

        if ($start && $end && strtotime($start) < $timeNow && strtotime($end) > $timeNow) {
          $complete = true;
          $images = get_field('images');
        }

        // get admin gallery images
        if ($loggedIn) {
          $complete = false;
          $p = get_field('preview_as_admin');
          if ($p && in_array('preview', $p)) {
            $adminImages = get_field('images');
          }
        }
      }
    }
  }

  // set admin preview
  if ($loggedIn && $adminImages) {
    $images = $adminImages;
  }

  wp_reset_postdata();
?>

<div id='artworks' style='display:none;'>
<?php
  // image data bank
  if ($images):
    foreach ($images as $img): ?>
      <div class='image'
        data-title='<?php echo $img['title']; ?>'
        data-url='<?php echo $img['image_file']['sizes']['large']; ?>'
        data-subtitle='<?php echo $img['sub_title']; ?>'
        data-desc='<?php echo $img['description']; ?>'
        data-hoff='<?php echo $img['horizontal_offset']; ?>'
        data-voff='<?php echo $img['vertical_offset'] ?>'
        data-width='<?php echo $img['width']; ?>'
        data-link='<?php echo $img['link']; ?>'
        data-location='<?php echo $img['location']; ?>'>
      </div>
    <?php
    endforeach;
  endif; ?>
</div>
