<div class='wrapper active'>
  <nav class='nav'>
    <div id='nav-content' class='nav__inner'>
      <div class='nav__item active' data-target='#page-home'>Featured</div>
      <div class='nav__item' data-target='#page-archive'>Archive</div>
      <div class='nav__item' data-target='#page-submissions'>Submissions</div>
      <div class='nav__item' data-target='#page-about'>About</div>
    </div>
  </nav>

  <div id='page-home' class='page active'>
    <div class='page__header'>
      <div class='page__title'>Featured</div>
    </div>
    <div class='page__content'>
      <?php get_template_part('wordpress/exhibition-preview'); ?>
      <?php get_template_part('wordpress/exhibition-current'); ?>
      <?php get_template_part('wordpress/exhibition-default'); ?>
      <?php get_template_part('wordpress/exhibition-upcoming'); ?>
    </div>
  </div>
  <div id='page-archive' class='page'>
    <div class='page__header'>
      <div class='page__title'>Archive</div>
    </div>
    <div class='page__content'>
      <?php get_template_part('wordpress/exhibition-archive'); ?>
    </div>
  </div>
  <div id='page-submissions' class='page'>
    <div class='page__header'>
      <div class='page__title'>Submissions</div>
    </div>
    <div class='page__content'>
      <?php get_template_part('wordpress/page-submissions'); ?>
    </div>
  </div>
  <div id='page-about' class='page'>
    <div class='page__header'>
      <div class='page__title'>About</div>
    </div>
    <div class='page__content'>
      <?php get_template_part('wordpress/page-about'); ?>
    </div>
    <div class='page__header'>
      <div class='page__title'>Contact</div>
    </div>
    <div class='page__content'>
      <?php get_template_part('wordpress/page-contact'); ?>
    </div>
  </div>
</div>
