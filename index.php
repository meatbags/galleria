<?php
  get_header();
?>

<div class='wrapper'>
  <div class='content'>
    <div class='content__inner'>
      <div class='canvas-target'></div>
    </div>
  </div>
</div>

<?php
  get_template_part('menu');
?>

<div class='label hidden'>
  <div class='label__inner'></div>
</div>

<div class='images' style='display:none'><?php
  $query = new wp_Query(array("post_type" => "gallery", "order_by" => "menu_order", "order" => "DESC"));
  if ($query->have_posts()):
    while ($query->have_posts()):
      $query->the_post();
      $images = get_field('images');
      foreach ($images as $img): ?>
    <div class='im'>
      <div class="im__title"><?php echo $img['title']; ?></div>
		  <div class="im__description"><?php echo $img['description']; ?></div>
		  <div class="im__url"><?php echo (($img['url'] != '') ? $img['url'] : 'https://printsbylily.com/'); ?></div>
		  <div class="im__image"><?php echo $img['image']['url']; ?></div>
      <div class="im__alpha"><?php echo $img['alpha']['url']; ?></div>
    </div>
  <?php endforeach; endwhile; endif; ?>
</div>

</div> <!-- /content -->
<?php wp_footer(); ?>
</body>
</html>
