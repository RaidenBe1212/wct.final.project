# Bean — Coffee Shop React Project

Each section is its own component in `src/components/`, and the menu data
lives separately in `src/data/menuItems.js` — this separation of data and
UI is a core React pattern worth pointing out if your teacher asks.

## How to run it

You'll need [Node.js](https://nodejs.org) installed (version 18 or later).

1. Open a terminal in this folder.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open the URL it prints (usually `http://localhost:5173`) in your browser.

To build a production version (a `dist/` folder you could deploy anywhere):

```
npm run build
```

## Project structure

```
coffee-shop-react/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx          # React entry point
│   ├── App.jsx            # Combines all sections
│   ├── index.css          # Global styles & color/font variables
│   ├── data/
│   │   └── menuItems.js   # Coffee menu data
│   └── components/
│       ├── Navbar.jsx / .css
│       ├── Hero.jsx / .css
│       ├── Home.jsx / .css
│       ├── Menu.jsx / .css
│       ├── MenuItem.jsx   # Reusable card, driven by props
│       ├── About.jsx / .css
│       ├── Contact.jsx / .css
│       └── Footer.jsx / .css
```
