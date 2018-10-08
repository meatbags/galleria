<?php
  // get upcoming & current exhibitions
  $query = new wp_Query(array("post_type" => "gallery", "posts_per_page" => -1, "order_by" => "menu_order"));
  $timeNow = time();
  $active = false;
  $gallery = array();
  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();
      $fields = get_fields();
      $start = $fields['start_date'];
      if ($start && strtotime($start) > $timeNow) {
        $gallery[get_the_ID()] = $fields;
      } else {
        $end = $fields['end_date'];
        if ($start && $end && strtotime($start) < $timeNow && strtotime($end) > $timeNow) {
          $active = $fields;
        }
      }
    }
  }
  wp_reset_postdata();
?>

<div id='page-exhibitions' class='page active'>
  <div class='page__inner'>
    <?php if ($active): ?>
      <div class='section section-featured'>
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
    <?php endif; ?>

    <div class='section section-upcoming'>
      <div class='label'>Coming Up</div>
      <br /><br />
      <div class='list'>
        <?php foreach ($gallery as $g): ?>
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

    <div class='section'>
      <div class='label'>Archive</div>
      <br /><br /><br />
      <h2>Exhibitions Archive</h2>
      <p class='border'>Coming soon -- the archive will be a showcase of previous Closed On Monday exhibitions.</p>
    </div>
  </div>
  <?php get_template_part('page-footer'); ?>
</div>
