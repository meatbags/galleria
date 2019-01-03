<div id='pane-gallery' class='pane pane-gallery'>
  <div class='pane__inner'>

    <div class='canvas-wrapper'>
      <div id='canvas-target' class='canvas-wrapper__inner'><!-- canvas --></div>
    </div>

    <div id='gallery-controls' class='pane-gallery_controls controls'>
      <div class='controls__inner fix-safari'>
        <div class='block'>
          <div id='ctrl-L' data-dir='left' class='control'>
            <svg width="15" height="20">
              <polygon points="14,1 1,10 14,19" style="stroke:#fff;stroke-width:2;" />
            </svg>
          </div>
        </div>
        <div class='block'>
          <div id='ctrl-U' data-dir='up' class='control'>
            <svg width="40" height="30">
              <polygon points="1,29 20,1 39,29" style="stroke:#fff;stroke-width:2;" />
            </svg>
          </div>
          <div id='ctrl-D' data-dir='down' class='control'>
            <svg width="40" height="30">
              <polygon points="1,1 20,29 39,1" style="stroke:#fff;stroke-width:2;" />
            </svg>
          </div>
        </div>
        <div class='block'>
          <div id='ctrl-R' data-dir='right' class='control'>
            <svg width="15" height="20">
              <polygon points="1,1 14,10 1,19" style="stroke:#fff;stroke-width:2;" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class='close-gallery-button close-gallery'>
      <img src='<?php echo get_template_directory_uri(); ?>/img/logo-box-blur.png' alt='Logo' />
    </div>

    <div class='pane-gallery_gallery-menu gallery-menu'>
      <div id='menu-controls' class='menu gallery-menu-controls'>
        <div class='content'>
          <div class='item'>
            <div class='requires-activate control-mouse control-img'>
              <img src='<?php echo get_template_directory_uri(); ?>/img/control-mouse.png' />
            </div>
            <div class='text'>Hold and drag to pan the camera.</div>
          </div>
          <div class='item'>
            <div class='requires-activate control-arrow control-img'>
              <img src='<?php echo get_template_directory_uri(); ?>/img/control-arrow.png' />
            </div>
            <div class='text'>Use the arrows or your keyboard arrows to move.</div>
          </div>
          <div class='item'>
            <div class='requires-activate control-artwork control-img'>
              <img src='<?php echo get_template_directory_uri(); ?>/img/control-artwork.png' />
            </div>
            <div class='text'>Click on an artwork to view it up close.</div>
          </div>
        </div>
        <div class='close-gallery-menu'>&times;</div>
      </div>

      <div id='artwork-target' data-active='' class='menu gallery-menu-artwork'>
        <div class='content'>
          <div class='artwork-half'>
            <div class='image'></div>
          </div>
          <div class='info-half'>
            <div class='artwork-info'>
              <div class='title'></div>
              <div class='subtitle'></div>
              <div class='desc'></div>
              <div class='link'></div>
            </div>
          </div>
          <div class='close-artwork-menu'>Close &times;</div>
        </div>
      </div>
    </div>
  </div>
</div>
