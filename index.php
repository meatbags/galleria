<?php
  get_header();
  $query = new wp_Query(array("post_type" => "gallery", "posts_per_page" => -1, "order_by" => "menu_order"));
  $now = time();
  $gallery = array();
  $active = false;
  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();
      $fields = get_fields();
      if ($fields['start_date'] && $fields['end_date']) {
        $from = strtotime($fields['start_date']);
        $to = strtotime($fields['end_date']);
        if ($from < $now && $to > $now) {
          $active = $fields;
        } else if ($from > $now) {
          $gallery[get_the_title()] = $fields;
        }
      }
    }
  }
  // artist_name exhibition_title artist_description start_date end_date
  // artist_social_media_links -> link_label url
  // images -> title image_file sub_title description link horizontal_offset vertical_offset width
?>

<div class='grid'></div>

<div class='wrapper'>
  <div class='canvas-wrapper'>
    <!-- canvas -->
  </div>
</div>

<div class='controls'>
  <div id='close-gallery' class='logo'>
    C-O-M
  </div>
</div>

<div class='loading'>
  <div class='loading__inner'>
    <div id='open-gallery' class='loading-button'>
      Loading Gallery <span class='percent'>0%</span>
    </div>
  </div>
</div>

<div class='logo-wrapper'>
  <div class='logo'>
    <div class='logo-image'>
      <img src='<?php echo get_template_directory_uri() . '/img/logo-1.jpg'; ?>'/>
    </div>
  </div>
</div>

<div class='nav'>
  <div class='nav__inner'>
    <div class='list'>
      <div class='item'>About</div>
      <div class='item'>Featured Artist</div>
      <div class='item'>Upcoming</div>
      <div class='item'>Archive</div>
      <div class='item'>Guest Book</div>
    </div>
  </div>
</div>

<div class='page'>
  <div class='page__inner'>

    <?php if ($active): ?>
      <div class='section featured'>
        <div class='label'>Featured Artist</div>
        <br /><br />
        <div class='artist-name'><?php echo $active['artist_name']; ?></div>
        <?php if ($active['exhibition_title']): ?>
          <div class='exhibition-title'><?php echo $active['exhibition_title']; ?></div>
        <?php endif; ?>
        <div class='dates'>
          <?php echo $active['start_date']; ?> &rarr; <?php echo $active['end_date']; ?>
        </div>
        <div class='artist-description'><?php echo $active['artist_description']; ?></div>
        <?php if ($active['artist_social_media_links']): ?>
          <div class='artist-social-media-links'>
            <div class='title'>Connect</div>
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

    <div class='section upcoming'>
      <div class='label'>Upcoming</div>
      <br /><br />
      <div class='list'>
        <?php foreach ($gallery as $g): ?>
          <div class='item'>
            <div class='dates'><?php echo $g['start_date']; ?> &rarr; <?php echo $g['end_date']; ?></div>
            <div class='title'><?php echo $g['artist_name']; ?></div>
            <div class='desc'>
              <?php if ($g['exhibition_title']) : ?>
                <span class='heading'><?php echo $g['exhibition_title']; ?></span>
              <?php endif; ?>
              <?php echo $g['artist_short_description']; ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>

    <div class='section about'>
      <div class='label'>About</div>
      <br /><br />
      <div class='about-title'>WTF is COM</div>
      <?php
        $q = new WP_Query('pagename=about');
        if ($q->have_posts()):
          while($q->have_posts()):
            $q->the_post();
            $content = wpautop(get_the_content(), true);
            ?>
            <div class='about-text'>
              <?php echo $content; ?>
            </div>
        <?php endwhile; ?>
      <?php endif; ?>
    </div>
  </div>
</div>

<?php wp_footer(); ?></body></html>
