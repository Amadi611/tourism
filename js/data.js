// ============================================================
//  data.js  ->  All tour packages live here.
//
//  In the old PHP version these rows came from a MySQL table.
//  For the static (database-free) site we simply keep them as a
//  JavaScript array. To add / edit a package, edit this file.
//  Put new photos in assets/images/ and point "image" at them.
// ============================================================

const PACKAGES = [
  {
    id: 1,
    title: "Sigiriya Rock Adventure",
    destination: "Sigiriya, Sri Lanka",
    price: 120.0,
    duration_days: 2,
    image: "assets/images/img.jpg",
    description:
      "<p>Climb the famous <strong>Lion Rock</strong>, a UNESCO World Heritage site rising 200m above the jungle.</p>" +
      "<ul><li>Ancient frescoes and the Mirror Wall</li><li>Water gardens and boulder gardens</li><li>Sunrise view from the summit</li></ul>"
  },
  {
    id: 2,
    title: "Ella Hill Country Escape",
    destination: "Ella, Sri Lanka",
    price: 200.0,
    duration_days: 3,
    image: "assets/images/img2.jpg",
    description:
      "<p>Ride the scenic train, visit the <em>Nine Arch Bridge</em> and hike Little Adam's Peak.</p>" +
      "<ul><li>Misty mountain views</li><li>Ravana Falls</li><li>Cool climate and cosy cafés</li></ul>"
  },
  {
    id: 3,
    title: "Mirissa Beach & Whales",
    destination: "Mirissa, Sri Lanka",
    price: 180.0,
    duration_days: 2,
    image: "assets/images/img3.jpg",
    description:
      "<p>Relax on golden beaches and join a morning <strong>whale watching</strong> tour.</p>" +
      "<ul><li>Blue whale and dolphin spotting</li><li>Coconut Tree Hill</li><li>Fresh seafood by the sea</li></ul>"
  },
  {
    id: 4,
    title: "Kandy Temple & Culture",
    destination: "Kandy, Sri Lanka",
    price: 150.0,
    duration_days: 2,
    image: "assets/images/temple.jpg",
    description:
      "<p>Discover the sacred <strong>Temple of the Tooth Relic</strong> in the last royal capital of Sri Lanka.</p>" +
      "<ul><li>Traditional Kandyan dance show</li><li>Peradeniya Botanical Gardens</li><li>Walk around Kandy Lake</li></ul>"
  },
  {
    id: 5,
    title: "Nuwara Eliya Tea Trails",
    destination: "Nuwara Eliya, Sri Lanka",
    price: 220.0,
    duration_days: 3,
    image: "assets/images/tea.jpg",
    description:
      "<p>Wander emerald <strong>tea plantations</strong> in the cool hills of 'Little England'.</p>" +
      "<ul><li>Tea factory tour and tasting</li><li>Gregory Lake boat rides</li><li>Colonial-era architecture</li></ul>"
  },
  {
    id: 6,
    title: "Yala Safari Wildlife",
    destination: "Yala National Park, Sri Lanka",
    price: 260.0,
    duration_days: 2,
    image: "assets/images/yala.jpg",
    description:
      "<p>Track leopards, elephants and crocodiles on a jeep <strong>safari</strong> through Yala.</p>" +
      "<ul><li>Highest leopard density in the world</li><li>Sunrise and evening game drives</li><li>Birdwatching by the lagoons</li></ul>"
  },
  {
    id: 7,
    title: "Kandy to Ella Scenic Train",
    destination: "Central Highlands, Sri Lanka",
    price: 90.0,
    duration_days: 1,
    image: "assets/images/train.jpg",
    description:
      "<p>One of the world's most beautiful <strong>train journeys</strong> through mountains and tea country.</p>" +
      "<ul><li>Open-window views of valleys</li><li>Tunnels, bridges and waterfalls</li><li>A relaxed, unforgettable ride</li></ul>"
  },
  {
    id: 8,
    title: "Colombo City Highlights",
    destination: "Colombo, Sri Lanka",
    price: 80.0,
    duration_days: 1,
    image: "assets/images/colombo.jpg",
    description:
      "<p>Explore the vibrant capital — markets, temples and the seafront <strong>Galle Face Green</strong>.</p>" +
      "<ul><li>Gangaramaya Temple</li><li>Pettah bazaar shopping</li><li>Sunset by the ocean</li></ul>"
  },
  {
    id: 9,
    title: "Southern Beach Getaway",
    destination: "Unawatuna & South Coast, Sri Lanka",
    price: 170.0,
    duration_days: 3,
    image: "assets/images/beach.jpg",
    description:
      "<p>Unwind on palm-fringed <strong>beaches</strong> along Sri Lanka's sunny south coast.</p>" +
      "<ul><li>Snorkelling and calm bays</li><li>Historic Galle Fort day trip</li><li>Beachfront dining</li></ul>"
  }
];

// Small helper so pages can look up one package by its id.
function getPackageById(id) {
  return PACKAGES.find(function (p) {
    return String(p.id) === String(id);
  });
}
