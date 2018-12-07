<?php
  // get upcoming & current exhibitions
  $query = new wp_Query(array("post_type" => "gallery", "posts_per_page" => -1, "order_by" => "menu_order"));
  $timeNow = time();
  $active = false;
  $adminActive = false;
  $upcoming = array();
  $archive = array();
  $loggedIn = is_user_logged_in();

  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();
      $fields = get_fields();
      $start = $fields['start_date'];
      $end = $fields['end_date'];

      // add gallery to upcoming, active, or archive
      if ($start && strtotime($start) > $timeNow) {
        $upcoming[get_the_ID()] = $fields;
      } else if ($start && $end && strtotime($start) < $timeNow && strtotime($end) > $timeNow) {
        $active = $fields;
      } else if ($start && $end && strtotime($end) < $timeNow) {
        $archive[get_the_ID()] = $fields;
      }

      // get preview for admin
      if ($loggedIn) {
        $p = $fields['preview_as_admin'];
        if ($p && in_array('preview', $fields['preview_as_admin'])) {
          $adminActive = $fields;
        }
      }
    }
  }

  // set admin preview
  if ($loggedIn && $adminActive) {
    $active = $adminActive;
  }

  wp_reset_postdata();
?>

<div id='page-exhibitions' class='page active'>
  <div class='page__inner'>
    <?php if ($active): ?>
      <div class='section section-featured'>
        <!--<div class='mobile-show mobile-logo'>
          <img src='<?php echo get_template_directory_uri() . '/img/logo-wire.png'; ?>'/>
        </div>-->
        <div class='label'>Featured Exhibition</div>
        <br /><br />
        <h1><?php echo $active['artist_name']; ?></h1>
        <?php if ($active['exhibition_title']): ?>
          <h2><?php echo $active['exhibition_title']; ?></h2>
        <?php endif; ?>
        <div class='dates'>
          <?php echo $active['start_date']; ?> &rarr; <?php echo $active['end_date']; ?>
        </div>
        <p class='border'><?php echo $active['artist_description']; ?></p>
        <?php if ($active['artist_social_media_links']): ?>
          <div class='artist-social-media-links'>
            <div class='links'>
              <?php foreach ($active['artist_social_media_links'] as $link): ?>
                <div class='item'>
                  <a href='<?php echo $link['url']; ?>' target='_blank'><?php echo $link['link_label']; ?></a>
                </div>
              <?php endforeach; ?>
            </div>
          </div>
        <?php endif; ?>
      </div>

      <!-- active exhibition data -->
      <div class='exhibition-data active-exhibition-data' style='display:none'>
        <?php if ($active['images']):
          foreach ($active['images'] as $img): ?>
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
          <?php endforeach;
        endif;
        if ($active['custom_exhibition_installation']): ?>
          <div class='custom-exhibition-installation'
            data-value = '<?php echo $active['custom_exhibition_installation'] ?>'>
          </div>
        <?php endif ?>
      </div>
    <?php endif; ?>

    <?php if (count($upcoming) > 0): ?>
      <div class='section section-upcoming'>
        <div class='label'>Coming Up</div>
        <br /><br />
        <div class='list'>
          <?php foreach ($upcoming as $g): ?>
            <div class='item'>
              <div class='dates'><?php echo $g['start_date']; ?> &rarr; <?php echo $g['end_date']; ?></div>
              <div class='desc'>
                <h1><?php echo $g['artist_name']; ?></h1>
                <?php if ($g['exhibition_title']) : ?>
                  <span class='heading'><?php echo $g['exhibition_title']; ?></span>
                <?php endif; ?>
                <?php echo $g['artist_short_description']; ?>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    <?php endif; ?>

    <?php if (count($archive) > 0): ?>
      <div class='section section-archive'>
        <div class='label'>Archive</div>
        <br /><br />
        <h2>View Previous Exhibitions</h2>
        <div class='list'>
          <?php foreach ($archive as $g): ?>
            <div class='item archive-item'>
              <div class='dates'>From <?php echo $g['start_date']; ?> &rarr; <?php echo $g['end_date']; ?></div>
              <div class='desc'>
                <h1><?php echo $g['artist_name']; ?></h1>
                <?php if ($g['exhibition_title']) : ?>
                  <span class='heading'><?php echo $g['exhibition_title']; ?></span>
                <?php endif; ?>
                <?php echo $g['artist_short_description']; ?>
              </div>

              <!-- archival exhibition data -->
              <div class='exhibition-data' style='display:none'>
                <?php if ($g['images']):
                  foreach ($g['images'] as $img): ?>
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
                  <?php endforeach;
                endif;
                if ($g['custom_exhibition_installation']): ?>
                  <div class='custom-exhibition-installation'
                    data-value = '<?php echo $g['custom_exhibition_installation'] ?>'>
                  </div>
                <?php endif ?>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    <?php endif; ?>
  </div>
  <?php get_template_part('page-footer'); ?>
</div>
