<?php get_template_part('wordpress/header'); ?>
<?php get_template_part('wordpress/nav'); ?>

<div class='logo'></div>

<div class='wrapper'>
  <div id='page-home' class='page active'>
    <div class='page__header'>
      <div class='page__title'>Featured</div>
    </div>
    <div class='page__content'>
      <?php get_template_part('wordpress/exhibition-preview'); ?>
      <?php get_template_part('wordpress/exhibition-current'); ?>
      <?php get_template_part('wordpress/exhibition-default'); ?>
    </div>
  </div>
  <div id='page-upcoming' class='page'>
    <div class='page__header'>
      <div class='page__title'>Upcoming</div>
    </div>
    <div class='page__content'>
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
  <div id='page-about' class='page'>
    <div class='page__header'>
      <div class='page__title'>About</div>
    </div>
    <div class='page__content'>
      <?php get_template_part('wordpress/page-about'); ?>
    </div>
  </div>
  <div id='page-submissions' class='page'>
    <div class='page__header'>
      <div class='page__title'>Submissions</div>
    </div>
    <div class='page__content'>
      <?php get_template_part('wordpress/page-submissions'); ?>
    </div>
    <div class='page__header'>
      <div class='page__title'>Contact</div>
    </div>
    <div class='page__content'>
      <?php get_template_part('wordpress/page-contact'); ?>
    </div>
  </div>
</div>

<div id='gallery' class='gallery'>
  <div class='gallery__inner'>
    <div class='canvas-wrapper'>
      <div id='canvas-target' class='canvas-wrapper__inner'></div>
    </div>
  </div>
</div>
<?php get_template_part('wordpress/footer'); ?>
