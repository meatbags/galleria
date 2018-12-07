<?php
  // get active exhibition data
  $query = new wp_Query(array("post_type" => "gallery", "posts_per_page" => -1, "order_by" => "menu_order"));
  $timeNow = time();
  $complete = false;
  $images = false;
  $adminImages = false;
  $installation = false;
  $adminInstallation = false;
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
          $installation = get_field('custom_exhibition_installation');
        }

        // get admin gallery images
        if ($loggedIn) {
          $complete = false;
          $p = get_field('preview_as_admin');
          if ($p && in_array('preview', $p)) {
            $adminImages = get_field('images');
            $adminInstallation = get_field('custom_exhibition_installation');
          }
        }
      }
    }
  }

  // set admin preview
  if ($loggedIn && $adminImages) {
    $images = $adminImages;
    $installation = $adminInstallation;
  }

  wp_reset_postdata();
?>
