<div id='page-about' class='page page-about'>
  <div class='page__inner'>
    <?php $query = new WP_Query('pagename=about'); ?>
    <div class='section'>
      <div class='label'>About</div>
      <br /><br />
      <h1>Closed On Monday</h1>
      <h2>Virtual Gallery</h2>
      <?php
        if ($query->have_posts()):
          while($query->have_posts()):
            $query->the_post(); ?>
            <div class='about-text border'>
              <?php echo wpautop(get_the_content(), true); ?>
            </div><?php
          endwhile;
        endif;?>
    </div>

    <?php wp_reset_postdata(); ?>
    <?php $query = new WP_Query('pagename=contact'); ?>
    <div class='section'>
      <div class='label'>Contact</div>
      <br /><br />
      <h1>Get In Touch</h1>
      <?php
        if ($query->have_posts()):
          while($query->have_posts()):
            $query->the_post(); ?>
            <div class='contact-text border'>
              <?php echo wpautop(get_the_content(), true); ?>
            </div><?php
          endwhile;
        endif;?>
    </div>
    <?php wp_reset_postdata(); ?>
  </div>
  <?php get_template_part('page-footer'); ?>
</div>
