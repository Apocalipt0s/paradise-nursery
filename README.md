# Paradise Nursery 🌿

**Paradise Nursery** is a responsive online plant shop created with **React, Vite, Redux Toolkit, React Redux, and React Router**. Customers can browse 18 unique houseplants across 3 categories, add plants to their cart, adjust quantities, remove items, and instantly see item totals and the order subtotal. This project is a client-side e-commerce demonstration; checkout is intentionally marked **Coming Soon**.

## Quick start

Prerequisites: **Node.js 20+** and **npm**.

```bash
npm install
npm run dev
```

Open the local address shown by Vite (typically **http://localhost:5173**).

To build a production version:

```bash
npm run build
npm run preview
```

To run Redux cart unit tests:

```bash
npm test
```

## Features

- **Landing page:** Paradise Nursery name, botanical background image, welcome message, About Us section, and **Get Started** link to the plant collection.
- **Product catalog:** 18 unique plants (6 per category) with an illustration thumbnail, description, light preference, price, and **Add to cart** action.
- **Three categories:** Air-Purifying Plants, Tropical Favorites, and Easy-Care Plants. Filter by category or search by plant name or description.
- **Cart integration:** Redux Toolkit actions and selectors for adding, incrementing, decrementing, removing, and clearing items. Product buttons become disabled if the product is in the cart and become available again if it is removed.
- **Dynamic cart count:** The cart icon in the shared navigation bar displays the total number of units, not only the number of unique products.
- **Cart page:** Each item includes thumbnail, unit price, quantity buttons, item total, and remove control; the summary includes subtotal, an illustrative shipping charge, and an order total.
- **Checkout placeholder:** Clicking checkout displays **“Checkout coming soon!”**. No payment is processed.
- **Continue shopping** returns to the product listing page.
- **Responsive layout** designed for desktop, tablet, and mobile.
- **Cart persistence** via the browser's localStorage (survives page refreshes).
- **Self-contained artwork:** 18 original illustrative SVG thumbnails are included in `public/plants/`. No third-party plant image host is required.

## Categories and inventory

| Category | Plants |
| --- | --- |
| Air-Purifying Plants | Snake Plant, Peace Lily, Spider Plant, Boston Fern, Rubber Plant, Areca Palm |
| Tropical Favorites | Monstera Deliciosa, Bird of Paradise, Heartleaf Philodendron, Calathea Orbifolia, Fiddle-Leaf Fig, Alocasia Polly |
| Easy-Care Plants | Golden Pothos, ZZ Plant, Aloe Vera, Jade Plant, Echeveria, String of Pearls |

All prices are **illustrative USD prices**. No real inventory or payments are connected. Shipping is an illustrative **$8** for nonempty carts under $75; free for carts of $75 and above. The **cart subtotal** always equals the sum of all `price × quantity` values.

## File structure

```text
paradise-nursery/
├── README.md                # Project name, details, and instructions (Task 1)
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── hero-plants.svg      # Hero artwork
│   └── plants/              # 18 original plant illustrations
├── scripts/
│   └── generate_art.py      # Optional SVG-art regeneration utility
└── src/
    ├── main.jsx            # React + Router + Redux bootstrapping
    ├── App.jsx             # Landing page, Get Started, page routes (Task 4)
    ├── App.css             # Global responsive styles and hero background (Task 3)
    ├── AboutUs.jsx         # About the company (Task 2)
    ├── ProductList.jsx     # 3 categories, 18 plants, Add to Cart (Task 6)
    ├── CartItem.jsx        # Cart totals and quantity actions (Task 7)
    ├── assets/
    │   └── hero-botanical.svg
    ├── components/
    │   ├── Navbar.jsx      # Shared menu and dynamic cart badge
    │   └── Footer.jsx
    ├── data/
    │   └── plants.js       # Plant catalog data
    └── redux/
        ├── CartSlice.jsx   # Redux shopping cart slice (Task 5)
        ├── CartSlice.test.js
        └── store.js        # Redux store + localStorage persistence
```

## Course assignment — GitHub links to submit

After you push this project to your own GitHub repository, replace `YOUR_USERNAME` with your GitHub username. If you choose a different repository name or branch, adjust the URLs to match. **These are URL templates, not live URLs until the repository is created and pushed.**

| Task | File | GitHub URL template |
| --- | --- | --- |
| 1 | README.md | `https://github.com/YOUR_USERNAME/paradise-nursery/blob/main/README.md` |
| 2 | AboutUs.jsx | `https://github.com/YOUR_USERNAME/paradise-nursery/blob/main/src/AboutUs.jsx` |
| 3 | App.css | `https://github.com/YOUR_USERNAME/paradise-nursery/blob/main/src/App.css` |
| 4 | App.jsx | `https://github.com/YOUR_USERNAME/paradise-nursery/blob/main/src/App.jsx` |
| 5 | CartSlice.jsx | `https://github.com/YOUR_USERNAME/paradise-nursery/blob/main/src/redux/CartSlice.jsx` |
| 6 | ProductList.jsx | `https://github.com/YOUR_USERNAME/paradise-nursery/blob/main/src/ProductList.jsx` |
| 7 | CartItem.jsx | `https://github.com/YOUR_USERNAME/paradise-nursery/blob/main/src/CartItem.jsx` |

### Upload using Git and GitHub

1. [Create an empty public repository](https://github.com/new) named **`paradise-nursery`**, without adding a generated README or `.gitignore` (these are already included).
2. Open a terminal in this project folder (the folder containing `package.json`), then run:

```bash
git init
git add .
git commit -m "Build Paradise Nursery React Redux shopping cart"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/paradise-nursery.git
git push -u origin main
```

3. Replace `YOUR_USERNAME` in the `git remote add` command with your actual GitHub username.
4. Open each GitHub file URL from the task table, verify the page displays the code, and submit the seven URLs to your course.

If Git asks for credentials, authenticate with **Git Credential Manager**, **GitHub CLI** (`gh auth login`), or a personal access token. GitHub account passwords do not work for Git HTTPS pushes.

## Notes

This demo uses **HashRouter** (`/#/plants`, `/#/cart`) so navigation works on simple static hosting platforms, including GitHub Pages. The shopping data and cart are entirely browser-side; no user accounts, payment processor, or production order service are implemented. Plant illustrations are generated by `scripts/generate_art.py` and can be reused or modified in this project.
