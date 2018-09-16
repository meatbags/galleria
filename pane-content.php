<div id='pane-content' class='pane pane-content active'>
  <div class='pane__inner'>
    <div class='pages'>
      <?php
        get_template_part('page-exhibitions');
        get_template_part('page-about');
        get_template_part('page-archive');
        get_template_part('page-contact');
        get_template_part('page-footer');
      ?>
    </div>
    <div class='gallery-prompt'>
      <!-- <img src='<?php echo get_template_directory_uri() . '/img/logo-1.jpg'; ?>'/> -->
      <div class='gallery-prompt__inner'>
        <div class='logo'>[[ Logo here ]]</div>
        <div id='open-gallery' class='open-gallery-button'>
          Loading Gallery <span class='percent'>33%</span>
        </div>
      </div>
    </div>
  </div>
</div>
