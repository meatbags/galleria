<?php $query = new WP_Query('pagename=about'); ?>
<?php wp_reset_postdata(); ?>
<div class='section'>
  <div class='section__heading'>Closed On Monday</div>
  <!-- <div class='section__title'>Virtual Gallery</div> -->
  <?php if ($query->have_posts()):
    while($query->have_posts()):
      $query->the_post(); ?>
        <div class='section__description'>
          <?php echo wpautop(get_the_content(), true); ?>
        </div>
  <?php endwhile;
    endif;
  ?>
  <?php get_template_part('wordpress/social-media'); ?>
</div>
