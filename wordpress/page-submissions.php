<?php $query = new WP_Query('pagename=submissions'); ?>
<?php wp_reset_postdata(); ?>
<div class='section'>
  <div class='section__heading'>Artist Call Out</div>
  <div class='section__title'>You, this space</div>
  <?php if ($query->have_posts()):
    while($query->have_posts()):
      $query->the_post(); ?>
        <div class='section__description'>
          <?php echo wpautop(get_the_content(), true); ?>
        </div><?php
      endwhile;
    endif;
  ?>
  <?php get_template_part('wordpress/social-media'); ?>
</div>
