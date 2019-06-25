<?php $query = new WP_Query('pagename=submissions'); ?>
<?php wp_reset_postdata(); ?>
<div class='section'>
  <div class='section__title'>Artist Call Out</div>
  <div class='section__subtitle'>You, this space</div>
  <?php if ($query->have_posts()):
    while($query->have_posts()):
      $query->the_post(); ?>
        <div class='section__content'>
          <?php echo wpautop(get_the_content(), true); ?>
        </div><?php
      endwhile;
    endif;
  ?>
</div>

<?php $query = new WP_Query('pagename=contact'); ?>
<?php wp_reset_postdata(); ?>
<div class='section'>
  <div class='section__title'>Contact</div>
  <?php if ($query->have_posts()):
    while($query->have_posts()):
      $query->the_post(); ?>
        <div class='section__content'>
          <?php echo wpautop(get_the_content(), true); ?>
        </div><?php
      endwhile;
    endif;?>
</div>
