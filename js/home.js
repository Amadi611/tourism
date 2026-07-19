// ============================================================
//  home.js  ->  Builds the package cards on the home page.
//  Replaces the PHP "while (mysqli_fetch_assoc())" loop.
// ============================================================

function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function packageCard(row) {
  return [
    '<div class="col-sm-6 col-lg-4">',
    '  <div class="card package-card h-100 shadow-sm border-0">',
    '    <img src="' + escapeHtml(row.image) + '"',
    '         class="card-img-top package-img"',
    '         alt="' + escapeHtml(row.title) + '"',
    "         onerror=\"this.src='https://via.placeholder.com/400x200?text=Tour+Package'\">",
    '    <div class="card-body d-flex flex-column">',
    '      <h5 class="card-title">' + escapeHtml(row.title) + '</h5>',
    '      <p class="text-muted mb-2">',
    '        <i class="bi bi-geo-alt-fill text-danger"></i> ' + escapeHtml(row.destination),
    '      </p>',
    '      <p class="mb-2">',
    '        <span class="badge bg-info text-dark"><i class="bi bi-clock"></i> ' + escapeHtml(row.duration_days) + ' days</span>',
    '        <span class="badge bg-success">$' + escapeHtml(row.price) + '</span>',
    '      </p>',
    '      <a href="package.html?id=' + encodeURIComponent(row.id) + '" class="btn btn-primary mt-auto">View Details</a>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('');
}

document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('package-grid');
  if (!grid) return;

  if (PACKAGES.length === 0) {
    grid.innerHTML = "<p class='text-muted'>No tour packages yet. Please check back soon.</p>";
    return;
  }

  // Newest first (matches the old "ORDER BY id DESC").
  var rows = PACKAGES.slice().sort(function (a, b) { return b.id - a.id; });
  grid.innerHTML = rows.map(packageCard).join('');
});
