(function () {
  $('#btn-contact-submit').click(function (event) {
    if (event) {
      event.preventDefault();

      let visitorObj = {
        name: $('#contact-form-name').val(),
        email: $('#contact-form-email').val(),
        message: $('#contact-form-message').val(),
      };

      console.log('CONTAT FORM SUBMITTED: ' + JSON.stringify(visitorObj));

      $.ajax({
        url: '/api/subscriber',
        type: 'POST',
        data: visitorObj,
        success: function (response) {
          console.log('SUBSCRIBER CREATED: ' + JSON.stringify(response));
        },
        error: function (response) {},
      });
    }
  });
})();
