<?php get_template_part('wordpress/header'); ?>
<?php get_template_part('wordpress/pages'); ?>
<?php get_template_part('wordpress/gallery'); ?>

<div id='logo' class='logo active open-gallery-prompt'>
  <div id='canvas-logo-target' class='logo__inner'></div>
  <div id='open-gallery-prompt' class='logo__prompt loading'>
    <span class='logo__prompt-loading'>Loading</span>
    <span class='logo__prompt-ready'>Open Gallery</span>
    <div id='open-gallery-artist'></div>
  </div>
</div>

<?php get_template_part('wordpress/footer'); ?>
