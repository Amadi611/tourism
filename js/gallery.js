// ============================================================
//  gallery.js  ->  Builds a photo grid from the package images.
//  Each photo links to that package's detail page.
// ============================================================

function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

 function galleryTile(pkg) {
  return `
    <div class="col-6 col-md-4">
      <a href="package.html?id=${encodeURIComponent(pkg.id)}" class="d-block position-relative overflow-hidden rounded shadow-sm">
        <img src="${escapeHtml(pkg.image)}" class="w-100 package-img" alt="${escapeHtml(pkg.title)}"
             onerror="this.src='img/placeholder.jpg'">
        <span class="position-absolute bottom-0 start-0 end-0 text-white p-2 small"
              style="background:linear-gradient(transparent,rgba(0,0,0,.7))">
          <i class="bi bi-geo-alt-fill"></i> ${escapeHtml(pkg.destination)}
        </span>
      </a>
    </div>`;
}

document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = PACKAGES.map(galleryTile).join('');
});
