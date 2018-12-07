<div id='pane-content' class='pane pane-content active'>
  <div class='pane__inner'>
    <div class='pages'>
      <?php
        get_template_part('page-exhibitions');
        get_template_part('page-about');
        get_template_part('page-contact');
      ?>
    </div>
  </div>
</div>

<div class='logo-main'>
  <div class='logo-main__inner'>
    <div class='logo-main-image'>
      <img src='<?php echo get_template_directory_uri() . '/img/logo-wire.png'; ?>'/>
    </div>
    <div class='logo-main-text'>
      <div id='open-gallery' class='open-gallery-button is-loading'>
        Loading...
      </div>
    </div>
  </div>
</div>
