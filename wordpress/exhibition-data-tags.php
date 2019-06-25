<?php
// sanitise quotations
function sanitiseQuotes($str) {
  $str = str_replace('"', '&#34;', $str);
  $str = str_replace("'", '&rsquo;', $str);
  return $str;
}

// get formatted exhibition data
function getExhibitionDataTags($fields) { ?>
  <div class='exhibition__name'><?php echo get_field('artist_name'); ?></div>
  <div class='exhibition__title'><?php echo get_field('exhibition_title'); ?></div>
  <div class='exhibition__date'><?php echo get_field('start_date'); ?>&rarr;<?php echo get_field('end_date'); ?></div>
  <div class='exhibition__description'><?php echo get_field('artist_description'); ?></div>
  <div class='exhibition__description-short'><?php echo get_field('artist_short_description'); ?></div>
  <?php $links = get_field('artist_social_media_links'); ?>
  <?php if ($links): ?>
    <div class='exhibition__links'>
      <?php foreach ($links as $link): ?>
        <div class='exhibition__link-item'>
          <a href='<?php echo $link['url']; ?>' target='_blank'><?php echo $link['link_label']; ?></a>
        </div>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
  <?php $images = get_field('images'); ?>
  <div class='exhibition__images' style='display:none'>
    <?php foreach ($images as $img): ?>
      <div class='exhibition__image'
        data-title='<?php echo sanitiseQuotes($img['title']); ?>'
        data-url='<?php echo $img['image_file']['sizes']['large']; ?>'
        data-sub-title='<?php echo sanitiseQuotes($img['sub_title']); ?>'
        data-description='<?php echo sanitiseQuotes($img['description']); ?>'
        data-horizontal-offset='<?php echo $img['horizontal_offset']; ?>'
        data-vertical-offset='<?php echo $img['vertical_offset'] ?>'
        data-width='<?php echo $img['width']; ?>'
        data-link='<?php echo $img['link']; ?>'
        data-location='<?php echo $img['location']; ?>'
        data-video-file='<?php echo $img['video_file']; ?>'
        data-audio-file='<?php echo $img['audio_file']; ?>'
        ></div>
    <?php endforeach; ?>
  </div>
  <?php $custom = get_field('custom_exhibition_installation'); ?>
  <?php if ($custom): ?>
  <div class='exhibition__custom-value' data-custom-value='<?php echo $custom; ?>' style='display:none'></div>
  <?php endif; ?>
<?php } ?>
