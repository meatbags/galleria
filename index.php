<?php get_template_part('wordpress/header'); ?>

<div id='logo' class='logo active transition open-gallery-prompt'>
  <div class='logo__inner'>
    <div id='canvas-logo-target' class='logo__canvas-wrapper'></div>
  </div>
  <div id='open-gallery-prompt' class='logo__prompt loading'>
    <span class='logo__prompt-loading'>Loading</span>
    <span class='logo__prompt-ready'>Open Gallery</span>
    <div id='open-gallery-artist'></div>
  </div>
  <div class='logo__more'>More &darr;</div>
</div>

<?php get_template_part('wordpress/pages'); ?>
<?php get_template_part('wordpress/gallery'); ?>
<?php get_template_part('wordpress/footer'); ?>
