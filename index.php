<?php
  get_header();
?>

<div id='background-grid' class='grid'></div>

<?php
  get_template_part('nav');
  get_template_part('pane-content');
  get_template_part('gallery');
  get_template_part('footer');
?>

<?php if (is_user_logged_in()): ?>
  <div class='admin-notification'>[admin mode]</div>
<?php endif; ?>

<?php wp_footer(); ?>
</body>
</html>
