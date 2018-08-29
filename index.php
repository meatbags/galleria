<?php
  get_header();
?>

<div class='canvas-wrapper'>
  <!-- canvas loads here -->
</div>
<div class='nav'>
  <div class='nav__inner'>
    <div class='nav-title'>Closed On Mondays</div>
    <div class='nav-menu'>
      <div class='item'>artworks</div>
      <div class='item'>about</div>
    </div>
  </div>
</div>

<!--
<div class="content">
  <div class='wrapper'>
    <div class='content'>
      <div class='content__inner'>
        <div class='canvas-target'></div>
      </div>
    </div>
  </div>
  <div class='menu hidden'>
    <div class='menu__inner'>
      <div class='menu-button open-menu'>menu</div>
    </div>
  </div>
  <div class='menu-about'>
    <div class='menu-about__inner'>
      <div class='menu-about__inner__p'>
        CLOSED on MONDAY
      </div>
    </div>
  </div>
  <div class='label hidden'>
    <div class='label__inner'></div>
  </div>
  <div class='images'><?php
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
    <?php endforeach;
  endwhile; endif; ?>
  </div>
</div>
<?php wp_footer(); ?>
-->

</body></html>
