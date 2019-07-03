  <footer class='footer'>
    <div class='footer__inner'>
      <div class='footer__social-media'>
        <?php get_template_part('wordpress/social-media'); ?>
      </div>
      <div class='footer__newsletter'>
        <div class='footer__newsletter-title'>Sign up to our newsletter</div>
        <form class='footer__newsletter-form'>
          <input type='text' name='comFormField' placeholder='Your Email'/>
          <button type='submit'>Submit</button>
        </form>
        <div class='footer__newsletter-msg' data-msg-sent='Sending...' data-msg-received='Thanks :)'>
          Sending...
        </div>
      </div>
    </div>
  </footer>
  <?php wp_footer(); ?>
  <?php if (is_user_logged_in()): ?>
    <div class='admin-notify'>Preview Mode</div>
  <?php endif; ?>
  </body>
</html>
