<?php
  get_header();
?>

<div id='background-grid' class='grid'></div>

<?php
  get_template_part('nav');
  get_template_part('pane-content');
  get_template_part('pane-gallery');
  get_template_part('part-exhibition-data');
?>

<?php wp_footer(); ?>
</body></html>
