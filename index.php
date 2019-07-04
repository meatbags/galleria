<?php get_template_part('wordpress/header'); ?>
<?php get_template_part('wordpress/pages'); ?>
<?php get_template_part('wordpress/gallery'); ?>

<div class='logo active'>
  <div id='open-gallery-prompt' class='logo__prompt loading'>
    <span class='logo__prompt-loading'>Loading</span>
    <span class='logo__prompt-ready'>Open Gallery</span>
    <div id='open-gallery-artist'></div>
  </div>
</div>

<?php get_template_part('wordpress/footer'); ?>
