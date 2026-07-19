# Travel Lanka — Static Site (No Database)

A database-free, static version of the "Travel Lanka" tourism site, ready to
deploy to **Vercel** (or any static host: Netlify, GitHub Pages, etc.).

The original project was PHP + MySQL. Vercel does not run PHP or MySQL, so the
data-driven parts were converted to plain HTML/CSS/JavaScript.

## What's inside

```
tourism-static/
├── index.html          Home page (hero + package grid)
├── package.html        Package detail + booking form (reads ?id= from the URL)
├── gallery.html        Photo gallery of all destinations
├── about.html          About page (story, stats, why-us)
├── contact.html        Contact details + message form
├── vercel.json         Static hosting config (clean URLs)
├── css/style.css       Extra styles (same as the original)
├── js/
│   ├── data.js         The tour packages (edit here to add/change packages)
│   ├── layout.js       Reusable navbar + footer
│   ├── home.js         Builds the package cards
│   ├── package.js      Renders one package + client-side booking form
│   ├── gallery.js      Builds the photo grid
│   └── contact.js      Client-side contact form
└── assets/images/      Package photos (9 images)
```

## Add or edit a package

Open `js/data.js` and edit the `PACKAGES` array. Each package has:
`id`, `title`, `destination`, `price`, `duration_days`, `image`, `description`.
Put new photos in `assets/images/` and point `image` at them.

## Run locally

Because the pages load JavaScript files, open them through a small local server
(not by double-clicking the file):

```bash
# from inside the tourism-static folder
npx serve .
# or
python -m http.server 8000
```

Then visit http://localhost:8000

## Deploy to Vercel

1. Push this `tourism-static` folder to a GitHub repo (or use the Vercel CLI).
2. In Vercel, **New Project → Import** the repo.
3. Framework preset: **Other**. Root directory: the folder containing
   `index.html`. No build command, no output directory needed.
4. Click **Deploy**.

Or with the CLI:

```bash
npm i -g vercel
cd tourism-static
vercel
```

## What changed from the PHP version

| Original (PHP + MySQL)            | Static version                                  |
|----------------------------------|-------------------------------------------------|
| `index.php` (DB query loop)      | `index.html` + `js/home.js` reading `data.js`   |
| `package.php?id=5`               | `package.html?id=5` + `js/package.js`           |
| `header.php` / `footer.php`      | injected by `js/layout.js`                       |
| MySQL `packages` table           | `PACKAGES` array in `js/data.js`                 |
| Server-side booking (`book.php`) | Client-side form → confirmation + `mailto:` link |

### Features that required a database (removed)

Customer **login/register**, **saved bookings** (`my-bookings.php`), and the
**admin panel** need a server and database, so they are not part of the static
site. If you need them later, use a hosted backend (e.g. a serverless function
+ a database like Supabase/Neon) or a form service (Formspree) for bookings.
