// ============================================================
//  layout.js  ->  Reusable navbar + footer.
//
//  In the PHP version these lived in header.php / footer.php and
//  were pulled in with include. Here we inject them with a tiny
//  bit of JavaScript so we still write them only ONCE.
// ============================================================

function renderNavbar() {
  return [
    '<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">',
    '  <div class="container">',
    '    <a class="navbar-brand fw-bold" href="index.html">',
    '        <i class="bi bi-airplane-engines"></i> Travel Lanka',
    '    </a>',
    '    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">',
    '        <span class="navbar-toggler-icon"></span>',
    '    </button>',
    '    <div class="collapse navbar-collapse" id="menu">',
    '        <ul class="navbar-nav ms-auto align-items-lg-center">',
    '            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>',
    '            <li class="nav-item"><a class="nav-link" href="index.html#packages">Packages</a></li>',
    '            <li class="nav-item"><a class="nav-link" href="gallery.html">Gallery</a></li>',
    '            <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>',
    '            <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>',
    '        </ul>',
    '    </div>',
    '  </div>',
    '</nav>'
  ].join('');
}

function renderFooter() {
  return [
    '<footer class="bg-dark text-white-50 py-4 mt-5">',
    '    <div class="container text-center">',
    '        <p class="mb-1 text-white fw-bold">',
    '            <i class="bi bi-airplane-engines"></i> Travel Lanka',
    '        </p>',
    '        <p class="mb-0 small">A student project &middot; Static site &middot; Built with HTML, Bootstrap &amp; a little JavaScript</p>',
    '    </div>',
    '</footer>'
  ].join('');
}

// Fill the placeholders as soon as the page is ready.
document.addEventListener('DOMContentLoaded', function () {
  var nav = document.getElementById('site-navbar');
  var foot = document.getElementById('site-footer');
  if (nav) nav.innerHTML = renderNavbar();
  if (foot) foot.innerHTML = renderFooter();
});
