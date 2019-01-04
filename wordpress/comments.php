<!--
<div class='comments'>
  <div class='comments__inner'>
    <div class='comments-title'>Comments</div>
    <div id='comments-here' class='comment-list'></div>
    <div class='comment-form'>
      <?php comment_form(array(
        'fields' => array('author' => '<p class="comment-form-author"><label for="author"></label>' .
          '<input id="author" name="author" type="text" placeholder="Your name" value=""/></p>'),
        'title_reply' => '<div class="form-title">Leave a comment! Be nice (mostly).</div>',
        'comment_notes_before' => '',
        'comment_field' => '<p class="comment-form-comment"><label for="comment"></label>' .
          '<textarea placeholder="Your comment" id="comment" name="comment" cols="45" rows="8" aria-required="true"></textarea></p>'
      )); ?>
    </div>
  </div>
  <div class='comment-scroll-prompt'>&darr;</div>
</div>

.comments {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;

  .comments-title {
    font-size: $fontLarge;
    @include pad(2, 1);
    border: $border;
    box-shadow: $boxShadow;
    display: inline-block;
  }

  .comment-scroll-prompt {
    position: absolute;
    bottom: 0;
    right: 0;
    pointer-events: none;
    padding: $space;
  }

  .comments__inner {
    @include pad(1, 2);
    width: 120%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;

    .comment-list {
      @include pad(0, 2);
      width: 83%;

      .comment {
        @include pad(0, 2);
        @include margin(0, 0.5);
        border-top: $border;
        border-bottom: $border;

        .name {

        }

        .date {

        }

        .text {

        }
      }
    }

    .comment-form {
      width: 83%;
      @include pad(0, 1);

      .comment-reply-title {
        padding-bottom: $space / 2;
      }

      form {
        p {
          @include margin(0, 0.5);

        }

        textarea, input[type=text] {
          outline: none !important;
          border: $border !important;
          border-radius: 0;
          background: black;
          color: white;
          font-size: $fontSize;
          font-family: $fontStack;
          padding: $space / 2;
          box-shadow: $boxShadow;
        }

        input[type=submit] {
          font-family: $fontStack;
          @include margin(0, 0.5);
          @include pad(1, 0);
          font-size: $fontSize;
          border-radius: 0;
          box-shadow: $boxShadow;
        }
      }
    }
  }
}
-->
