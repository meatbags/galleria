  <footer class='footer'>
    <div class='footer__inner'>
      <div class='footer__social-media'>
        <a href='https://www.instagram.com/closed_on_monday_gallery/' target='_blank'> insta </a>/
        <a href='mailto:closedonmondaygallery@gmail.com'> email </a>/
        <a href='https://www.facebook.com/closedonmondaygallery/' target='_blank'> fb </a>/
        <a href='https://github.com/meatbags/galleria' target='_blank'> github </a>
      </div>
      <div class='footer__newsletter'>
        <div class='newsletter-title'>Sign up for our newsletter</div>
        <form class='newsletter-form'>
          <input type="text" name="comFormField" placeholder="Your Email"/>
          <button type="submit" class='newsletter-submit-form'>Submit</button>
        </form>
        <div class='newsletter-thanks'>sending...</div>
        <div class='newsletter-thanks-message'>thanks :)</div>
      </div>
    </div>
  </footer>
  <?php wp_footer(); ?>
  <?php if (is_user_logged_in()): ?>
    <div class='admin-notify'>[admin mode]</div>
  <?php endif; ?>
  </body>
</html>
