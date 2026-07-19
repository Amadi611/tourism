// ============================================================
//  package.js  ->  Shows ONE package + a booking form.
//  Replaces package.php. Reads the id from the URL (?id=2).
// ============================================================

function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function renderNotFound(container) {
  container.innerHTML =
    "<div class='alert alert-warning'>Package not found. " +
    "<a href='index.html'>Back to home</a></div>";
}

function renderPackage(container, pkg) {
  container.innerHTML = [
    '<div class="row g-4">',

    // LEFT: picture + description
    '  <div class="col-lg-7">',
    '    <img src="' + escapeHtml(pkg.image) + '" class="img-fluid rounded shadow-sm mb-4"',
    '         alt="' + escapeHtml(pkg.title) + '"',
    "         onerror=\"this.src='https://via.placeholder.com/700x400?text=Tour+Package'\">",
    '    <h2>' + escapeHtml(pkg.title) + '</h2>',
    '    <p class="text-muted"><i class="bi bi-geo-alt-fill text-danger"></i> ' + escapeHtml(pkg.destination) + '</p>',
    '    <hr>',
    '    <h5>About this tour</h5>',
    '    <div>' + pkg.description + '</div>',  // description is trusted HTML from data.js
    '  </div>',

    // RIGHT: price + booking form
    '  <div class="col-lg-5">',
    '    <div class="card shadow-sm border-0">',
    '      <div class="card-body">',
    '        <h4 class="text-success mb-1">$' + escapeHtml(pkg.price) + ' <small class="text-muted fs-6">/ person</small></h4>',
    '        <p class="mb-3"><span class="badge bg-info text-dark"><i class="bi bi-clock"></i> ' + escapeHtml(pkg.duration_days) + ' days</span></p>',
    '        <hr>',
    '        <h5 class="mb-3">Book this tour</h5>',
    '        <form id="booking-form">',
    '          <div class="mb-3">',
    '            <label class="form-label">Your Name</label>',
    '            <input type="text" name="name" class="form-control" required>',
    '          </div>',
    '          <div class="mb-3">',
    '            <label class="form-label">Email</label>',
    '            <input type="email" name="email" class="form-control" required>',
    '          </div>',
    '          <div class="mb-3">',
    '            <label class="form-label">Travel Date</label>',
    '            <input type="date" name="travel_date" class="form-control" required>',
    '          </div>',
    '          <div class="mb-3">',
    '            <label class="form-label">Number of People</label>',
    '            <input type="number" name="num_people" class="form-control" min="1" value="1" required>',
    '          </div>',
    '          <button type="submit" class="btn btn-success w-100"><i class="bi bi-check2-circle"></i> Request Booking</button>',
    '        </form>',
    '        <div id="booking-result" class="mt-3"></div>',
    '      </div>',
    '    </div>',
    '  </div>',

    '</div>',
    '<a href="index.html" class="btn btn-link mt-4">&larr; Back to all packages</a>'
  ].join('');

  wireBookingForm(pkg);
}

// The static site has no server, so a "booking" simply confirms
// on-screen and opens the visitor's email app with the details.
function wireBookingForm(pkg) {
  var form = document.getElementById('booking-form');
  var result = document.getElementById('booking-result');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var people = parseInt(data.get('num_people'), 10) || 1;
    var total = (pkg.price * people).toFixed(2);

    result.innerHTML =
      '<div class="alert alert-success mb-0">' +
      '<strong>Thank you, ' + escapeHtml(data.get('name')) + '!</strong><br>' +
      'Your request for <strong>' + escapeHtml(pkg.title) + '</strong> ' +
      '(' + people + ' people, estimated total <strong>$' + total + '</strong>) has been noted.<br>' +
      'We will contact you at ' + escapeHtml(data.get('email')) + ' to confirm.' +
      '</div>';

    var subject = 'Booking request: ' + pkg.title;
    var body =
      'Package: ' + pkg.title + '\n' +
      'Name: ' + data.get('name') + '\n' +
      'Email: ' + data.get('email') + '\n' +
      'Travel date: ' + data.get('travel_date') + '\n' +
      'People: ' + people + '\n' +
      'Estimated total: $' + total;
    window.location.href =
      'mailto:info@travellanka.example?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    form.reset();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('package-container');
  if (!container) return;

  var pkg = getPackageById(getParam('id'));
  if (!pkg) {
    renderNotFound(container);
    return;
  }
  document.title = pkg.title + ' - Travel Lanka';
  renderPackage(container, pkg);
});
