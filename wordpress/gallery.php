<div id='gallery' class='gallery'>
  <nav class='nav nav--gallery'>
    <div class='nav__inner'>
      <div id='nav-item-gallery' class='nav__item active'>Gallery</div>
      <div id='nav-item-controls' class='nav__item'>Controls</div>
      <div class='nav__item close-gallery'>Home</div>
    </div>
  </nav>

  <!-- canvas target -->
  <div class='gallery__inner'>
    <div class='canvas-wrapper'>
      <div id='canvas-target' class='canvas-wrapper__inner'></div>
    </div>
  </div>

  <!-- popup artwork information -->
  <div id='popup-artwork-info' class='gallery__popup-artwork-info'>
    <div class='popup-artwork-info__inner'>
      <div class='popup-artwork-info__image image'></div>
      <div class='popup-artwork-info__details'>
        <div class='title'></div>
        <div class='subtitle'></div>
        <div class='desc'></div>
        <div class='link'></div>
        <div id='popup-artwork-info-close' class='close'>&times;</div>
      </div>
    </div>
  </div>

  <!-- onscreen controls -->
  <div id='gallery-controls' class='gallery__controls active'>
    <div class='gallery__control-block'>
      <div id='ctrl-L' data-dir='left' class='control'>
        <svg width="15" height="20">
          <polygon points="14,1 1,10 14,19" style="stroke:#fff;stroke-width:2;" />
        </svg>
      </div>
    </div>
    <div class='gallery__control-block'>
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
    <div class='gallery__control-block'>
      <div id='ctrl-R' data-dir='right' class='control'>
        <svg width="15" height="20">
          <polygon points="1,1 14,10 1,19" style="stroke:#fff;stroke-width:2;" />
        </svg>
      </div>
    </div>
  </div>

  <!-- controls help -->
  <div id='popup-gallery-controls' class='gallery__popup-gallery-controls'>
    <div class='popup-gallery-controls__item'>
      <div class='popup-gallery-controls__mouse'>
        <img src='<?php echo get_template_directory_uri(); ?>/img/control-mouse.png' />
      </div>
      <div class='popup-gallery-controls__text'>Hold & drag to pan the camera</div>
    </div>
    <div class='popup-gallery-controls__item'>
      <div class='popup-gallery-controls__arrow'>
        <img src='<?php echo get_template_directory_uri(); ?>/img/control-arrow.png' />
      </div>
      <div class='popup-gallery-controls__text'>Move with your keyboard arrows</div>
    </div>
    <div class='popup-gallery-controls__item'>
      <div class='popup-gallery-controls__artwork'>
        <img src='<?php echo get_template_directory_uri(); ?>/img/control-artwork.png' />
      </div>
      <div class='popup-gallery-controls__text'>Click an artwork to view it closer</div>
    </div>
    <div class='popup-gallery-controls__close'>&times;</div>
  </div>
</div>
