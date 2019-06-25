<?php $query = new WP_Query('pagename=about'); ?>
<?php wp_reset_postdata(); ?>
<div class='section'>
  <div class='section__title'>Closed On Monday</div>
  <div class='section__subtitle'>Virtual Gallery</div>
  <?php if ($query->have_posts()):
    while($query->have_posts()):
      $query->the_post(); ?>
        <div class='section__content'>
          <?php echo wpautop(get_the_content(), true); ?>
        </div>
  <?php endwhile;
    endif;
  ?>
</div>
