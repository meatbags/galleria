<?php get_template_part('wordpress/header'); ?>
<?php get_template_part('wordpress/mobile-warning'); ?>

<div id='background-grid' class='grid'></div>

<?php
  get_template_part('wordpress/nav');
  get_template_part('wordpress/pane-content');
  get_template_part('wordpress/gallery');
  get_template_part('wordpress/footer');
?>

<?php if (is_user_logged_in()): ?>
  <div class='admin-notification'>[admin mode]</div>
<?php endif; ?>

<?php wp_footer(); ?>
</body>
</html>
