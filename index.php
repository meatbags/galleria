<?php
  get_header();
  $query = new wp_Query(array("post_type" => "gallery", "order_by" => "menu_order", "order" => "DESC"));
  // title, description, url || https://printsbylily.com/, image.url, alpha.url
  if ($query->have_posts()):
    while ($query->have_posts()):
      $query->the_post();
      $images = get_field('images');
      $dir = get_template_directory_uri();
?>

<div class='canvas-wrapper'><!-- canvas --></div>

<div class='nav'>
  <div class='nav__inner'>
    <div class='nav-title'>Closed On Mondays</div>
    <div class='nav-menu'>
      <div data-selector='.menu-art' class='item'>artworks</div>
      <div data-selector='.menu-about' class='item'>about</div>
      <div data-selector='.menu-controls' class='item'>controls</div>
    </div>
  </div>
</div>

<div class='menu menu-art'>
  <div class='menu__inner'>
    <div class='artworks'>
      <?php foreach ($images as $img): ?>
        <div class='item'>
          <div class='item-thumbnail'>
            <img src='<?php echo $img['image']['sizes']['thumbnail']; ?>' />
          </div>
          <div class='item-title'><?php echo $img['title']; ?></div>
        </div>
      <?php endforeach; ?>
    </div>
    <div data-selector='.menu-art' class='close-menu'>
    </div>
  </div>
</div>
<div class='menu menu-about'>
  <div class='menu__inner'>about?</div>
</div>
<div class='menu menu-controls'>
  <div class='menu__inner'>
    <div class='controls'>
      <div class='control-header'>
        <div class='control-title'>Controls</div>
      </div>
      <div class='control-content'>
        <div class='row'><div>MOVE &rarr;</div><div>Arrow Keys or WSAD</div></div>
        <div class='row'><div>CAMERA CONTROL</div><div>Click & Drag Viewport</div></div>
        <div class='row'><div>INTERACT</div><div>Left Mouse Button</div></div>
      </div>
      <div class='control-footer'>
        <div data-selector='.menu-controls' class='close-menu'>
          <div class='msg'>CLOSE MENU</div>
          <div class='anim'></div>
        </div>
      </div>
    </div>
  </div>
</div>
<?php endwhile; endif; wp_footer(); ?></body></html>
