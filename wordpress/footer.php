<script type='text/javascript'>
  var buttons = document.querySelectorAll('.newsletter-submit-form');

  // send newsletter sub -> google docs page
  for (var i=0; i<buttons.length; i++) {
    buttons[i].addEventListener('click', function(evt) {
      evt.preventDefault();
      var el = evt.currentTarget;
      var parent = el.parentNode;
      var input = parent.querySelector('input');
      var email = encodeURIComponent(input.value);
      if (email != '') {
        var baseUrl = 'https://script.google.com/macros/s/AKfycbxpOII5qXk8NJeTZPTLyUfTZ2OAqzg6a5aQJYuQYrvG3jUPjUjp/exec';
        var data = '?comFormField=' + email;
        var req = new XMLHttpRequest();

        // sending box
        var thanks = document.querySelectorAll('.newsletter-thanks');
        for (var j=0; j<thanks.length; ++j) {
          thanks[j].classList.add('active');
        }

        req.open('GET', baseUrl + data, true);
        req.onload = function() {
          if (req.status >= 200 && req.status < 400) {
            var text = document.querySelector('.newsletter-thanks-message').innerHTML;
            for (var j=0; j<thanks.length; ++j) {
              thanks[j].innerHTML = text;
            }
            input.value = '';
            // var resp = req.responseText;
          } else {
            //console.log("Server Error", req);
          }
        };
        req.onerror = function(err) {
          //console.log("Client Error", err);
        };
        req.send();
      }
    });
  }
</script>
