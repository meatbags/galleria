<?php
  $query = new WP_Query('pagename=contact');
?>

<div id='page-contact' class='page page-contact'>
  <div class='page__inner'>
    <div class='section'>
      <div class='label'>Contact</div>
      <br /><br />
      <h1>Call Out</h1>
      <?php
        if ($query->have_posts()):
          while($query->have_posts()):
            $query->the_post(); ?>
            <div class='contact-text'>
              <?php echo wpautop(get_the_content(), true); ?>
            </div><?php
          endwhile;
        endif;?>
    </div>
  </div>
</div>

<?php wp_reset_postdata(); ?>
