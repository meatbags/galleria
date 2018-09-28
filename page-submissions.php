<?php
  $query = new WP_Query('pagename=submissions');
?>

<div id='page-submissions' class='page page-submissions'>
  <div class='page__inner'>
    <div class='section'>
      <div class='label'>Submit</div>
      <br /><br />
      <h1>Artist Call Out</h1>
      <h2>You, this space</h2>
      <?php
        if ($query->have_posts()):
          while($query->have_posts()):
            $query->the_post(); ?>
            <div class='submissions-text border'>
              <?php echo wpautop(get_the_content(), true); ?>
            </div><?php
          endwhile;
        endif;?>
    </div>
  </div>
  <?php get_template_part('page-footer'); ?>
</div>

<?php wp_reset_postdata(); ?>
