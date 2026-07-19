// ============================================================
//  contact.js  ->  Client-side contact form.
//  No server: it confirms on-screen and opens the email app.
// ============================================================

function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  var result = document.getElementById('contact-result');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);

    result.innerHTML =
      '<div class="alert alert-success mb-0">' +
      '<strong>Thanks, ' + escapeHtml(data.get('name')) + '!</strong> ' +
      'Your message has been prepared. We will reply to ' +
      escapeHtml(data.get('email')) + ' soon.</div>';

    var subject = 'Website enquiry from ' + data.get('name');
    var body =
      'Name: ' + data.get('name') + '\n' +
      'Email: ' + data.get('email') + '\n\n' +
      data.get('message');
    window.location.href =
      'mailto:info@travellanka.example?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    form.reset();
  });
});
