# StratsBites — Build Guide

A step-by-step guide for building the Strathmore University campus food delivery app.
Your skeleton is set up and running. This document tells you **what to code, where, and why**.

---

## Your Project Structure

```
Webapp-project/
├── index.html              ← HTML shell (loads the app)
├── vite.config.js           ← Build tool config (don't touch)
├── package.json             ← Dependencies
├── public/                  ← Static files (put images here)
├── src/
│   ├── main.jsx             ← Boot file (don't touch)
│   ├── App.js               ← Route definitions
│   ├── App.css              ← All your styles go here
│   ├── index.css            ← CSS reset only
│   ├── data/
│   │   └── data.json        ← Mock cafeteria & menu data
│   ├── components/
│   │   ├── Header.js        ← Navigation bar
│   │   ├── Layout.js        ← Page wrapper (Header + Outlet + Footer)
│   │   ├── CafeteriaCard.js ← Card for one cafeteria
│   │   └── MenuItem.js      ← Row for one menu item
│   └── pages/
│       ├── HomePage.js      ← Landing page
│       ├── CafeteriaMenuPage.js ← Menu for one cafeteria
│       └── CheckoutPage.js  ← Cart / order page
```

---

## How to Run

```bash
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173/`).

---

## Route Map

Before you start coding, understand how users will navigate your app:

| URL | Page | What it shows |
|-----|------|---------------|
| `/` | HomePage | Hero banner + grid of cafeteria cards |
| `/cafeteria/cafe-1` | CafeteriaMenuPage | Menu items for "The Quad Grill" |
| `/cafeteria/cafe-2` | CafeteriaMenuPage | Menu items for "Madaraka Bites" |
| `/checkout` | CheckoutPage | Cart summary |

The routing is already wired up in `src/App.js`. You don't need to change it unless you add new pages.

---

## Understanding the Files You Won't Touch

### main.jsx — The Boot File

This file starts your app. It wraps `<App />` inside `<BrowserRouter>` which enables routing. You will **never need to edit this file** unless you add a global provider (like a CartContext — covered in Step 8).

### App.js — The Route Definitions

This file maps URLs to page components using `<Routes>` and `<Route>`. It also wraps everything in a `<Layout>` so the Header and Footer appear on every page.

```js
<Routes>
  <Route element={<Layout />}>        {/* Layout wraps all child routes */}
    <Route index element={<HomePage />} />                  {/* / */}
    <Route path="cafeteria/:id" element={<CafeteriaMenuPage />} />  {/* /cafeteria/cafe-1 */}
    <Route path="checkout" element={<CheckoutPage />} />    {/* /checkout */}
  </Route>
</Routes>
```

> [!NOTE]
> **`:id` is a URL parameter.** When a user visits `/cafeteria/cafe-2`, React Router passes `{ id: "cafe-2" }` to CafeteriaMenuPage. You'll extract it with `useParams()`.

### data.json — Your Mock Database

Open `src/data/data.json` and study its shape. Everything you build reads from this file.

```
data.cafeterias → array of cafeteria objects
  └── each cafeteria has: id, name, description, rating, deliveryTime, menu
        └── menu → array of item objects
              └── each item has: id, name, description, price, category
```

Prices are in **KES** (Kenyan Shillings).

---

## Step 1: Build the Header

**File:** `src/components/Header.js`

The Header is a sticky navigation bar at the top of every page. It needs:
- A logo/brand name (links to home)
- Navigation links
- A cart button (links to checkout)

### What you need to know

`<Link>` from react-router-dom works like an `<a>` tag but **doesn't reload the page**. This is what makes your app feel fast — it's a Single Page App (SPA).

### Code to write

```js
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header__inner">

        {/* Logo — clicking it goes to the home page */}
        <Link to="/" className="header__logo">
          🍔 StratsBites
        </Link>

        {/* Navigation */}
        <nav className="header__nav">
          <Link to="/" className="header__link">Home</Link>
          <Link to="/checkout" className="header__cart-btn">
            🛒 Cart
          </Link>
        </nav>

      </div>
    </header>
  );
};

export default Header;
```

### CSS to add in App.css (under `/* ── Header */`)

```css
.header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a56db;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.header__link {
  font-weight: 500;
  color: #64748b;
}

.header__link:hover {
  color: #1a56db;
}

.header__cart-btn {
  background: #1a56db;
  color: white;
  padding: 8px 16px;
  border-radius: 9999px;
  font-weight: 600;
}
```

> [!TIP]
> **Test it now.** After saving Header.js and App.css, run `npm run dev` and you should see the nav bar on every page.

---

## Step 2: Build the Layout

**File:** `src/components/Layout.js`

### What you need to know

`<Outlet />` is a react-router-dom component that says **"render the matched child route here"**. It's what makes the Layout pattern work — you write the Header and Footer once, and every page appears between them.

### Code to write

```js
import { Outlet } from 'react-router-dom';
import Header from './Header.js';

const Layout = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>© 2026 StratsBites — Strathmore University</p>
      </footer>
    </div>
  );
};

export default Layout;
```

### CSS to add in App.css (under `/* ── Layout */`)

```css
.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  width: 100%;
}

.footer {
  text-align: center;
  padding: 32px 16px;
  color: #64748b;
  font-size: 0.85rem;
  border-top: 1px solid #e2e8f0;
}
```

---

## Step 3: Build the Home Page

**File:** `src/pages/HomePage.js`

The home page has two sections:
1. A **hero banner** with a tagline
2. A **grid of cafeteria cards**

### What you need to know

`.map()` is how you render a list in React. You loop over an array and return a component for each item. **Every item needs a unique `key` prop** so React can track changes efficiently.

### Code to write

```js
import data from '../data/data.json';
import CafeteriaCard from '../components/CafeteriaCard.js';

const HomePage = () => {
  const { cafeterias } = data;

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero">
        <h1 className="hero__title">Campus Eats, Delivered 🚀</h1>
        <p className="hero__subtitle">
          Order from your favourite Strathmore cafeterias.
        </p>
      </section>

      {/* Cafeteria Grid */}
      <section>
        <h2 className="section-title">Campus Cafeterias</h2>
        <div className="cafeteria-grid">
          {cafeterias.map((cafeteria) => (
            <CafeteriaCard key={cafeteria.id} cafeteria={cafeteria} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
```

### CSS to add in App.css (under `/* ── Home Page */`)

```css
.hero {
  text-align: center;
  padding: 48px 16px;
  background: linear-gradient(135deg, #1a56db, #7c3aed);
  border-radius: 16px;
  color: white;
  margin-bottom: 32px;
}

.hero__title {
  font-size: 2.75rem;
  font-weight: 800;
}

.hero__subtitle {
  font-size: 1.15rem;
  opacity: 0.9;
  margin-top: 8px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 24px;
}

.cafeteria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
}
```

---

## Step 4: Build the Cafeteria Card

**File:** `src/components/CafeteriaCard.js`

Each card is a clickable link that takes the user to that cafeteria's menu.

### What you need to know

**Props** are how you pass data from a parent component to a child. Here, `HomePage` passes a `cafeteria` object to each `CafeteriaCard`. You access it via `({ cafeteria })` in the function parameters — this is **destructuring**.

Template literals (`` `text ${variable}` ``) let you build dynamic strings, like the URL path.

### Code to write

```js
import { Link } from 'react-router-dom';

const CafeteriaCard = ({ cafeteria }) => {
  return (
    <Link to={`/cafeteria/${cafeteria.id}`} className="cafeteria-card">
      {/* Placeholder for cafeteria image */}
      <div className="cafeteria-card__image" />

      <div className="cafeteria-card__body">
        <h3 className="cafeteria-card__name">{cafeteria.name}</h3>
        <p className="cafeteria-card__desc">{cafeteria.description}</p>
        <div className="cafeteria-card__meta">
          <span>⭐ {cafeteria.rating}</span>
          <span>🕐 {cafeteria.deliveryTime}</span>
          <span>📋 {cafeteria.menu.length} items</span>
        </div>
      </div>
    </Link>
  );
};

export default CafeteriaCard;
```

### CSS to add in App.css (under `/* ── Cafeteria Card */`)

```css
.cafeteria-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.cafeteria-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.cafeteria-card__image {
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
}

.cafeteria-card__body {
  padding: 16px;
}

.cafeteria-card__name {
  font-size: 1.2rem;
  font-weight: 700;
}

.cafeteria-card__desc {
  font-size: 0.9rem;
  color: #64748b;
  margin: 4px 0 16px;
}

.cafeteria-card__meta {
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  color: #64748b;
}
```

> [!TIP]
> **Checkpoint!** At this point your home page should show two clickable cards. Clicking one should navigate to `/cafeteria/cafe-1` (blank for now). If it does, you're on track.

---

## Step 5: Build the Cafeteria Menu Page

**File:** `src/pages/CafeteriaMenuPage.js`

This page shows all menu items for one specific cafeteria.

### What you need to know

`useParams()` is a React Router hook. When the URL is `/cafeteria/cafe-1`, calling `useParams()` returns `{ id: "cafe-1" }`. You use this to look up the right cafeteria from your data.

`.find()` searches an array and returns the **first item** that matches your condition, or `undefined` if nothing matches.

### Code to write

```js
import { useParams, Link } from 'react-router-dom';
import data from '../data/data.json';
import MenuItem from '../components/MenuItem.js';

const CafeteriaMenuPage = () => {
  const { id } = useParams();
  const cafeteria = data.cafeterias.find((c) => c.id === id);

  // Handle case where the cafeteria doesn't exist
  if (!cafeteria) {
    return (
      <div>
        <h2>Cafeteria not found</h2>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="back-link">← Back to all cafeterias</Link>

      {/* Cafeteria Info */}
      <div className="menu-header">
        <h1 className="menu-header__title">{cafeteria.name}</h1>
        <div className="menu-header__info">
          <span>⭐ {cafeteria.rating}</span>
          <span>🕐 {cafeteria.deliveryTime}</span>
        </div>
        <p className="menu-header__desc">{cafeteria.description}</p>
      </div>

      {/* Menu Items List */}
      <div className="menu-list">
        {cafeteria.menu.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CafeteriaMenuPage;
```

### CSS to add in App.css (under `/* ── Cafeteria Menu Page */`)

```css
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 24px;
}

.back-link:hover {
  color: #1a56db;
}

.menu-header {
  margin-bottom: 32px;
}

.menu-header__title {
  font-size: 2rem;
  font-weight: 800;
}

.menu-header__info {
  display: flex;
  gap: 16px;
  margin-top: 8px;
  font-size: 0.9rem;
  color: #64748b;
}

.menu-header__desc {
  margin-top: 8px;
  color: #64748b;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

---

## Step 6: Build the Menu Item

**File:** `src/components/MenuItem.js`

Each menu item is a **horizontal row**: image on the left, details in the middle, button on the right.

### What you need to know

`onClick` attaches a function to a button click. For now, we'll use `alert()` as a placeholder. Later (Step 8), you'll replace it with real cart logic.

### Code to write

```js
const MenuItem = ({ item }) => {
  return (
    <div className="menu-item">
      {/* Item image placeholder */}
      <div className="menu-item__image" />

      {/* Item details */}
      <div className="menu-item__details">
        <h4 className="menu-item__name">{item.name}</h4>
        <p className="menu-item__desc">{item.description}</p>
        <span className="menu-item__price">KES {item.price}</span>
      </div>

      {/* Add to cart button */}
      <div className="menu-item__actions">
        <button
          className="btn btn--primary"
          onClick={() => alert(`Added "${item.name}" to cart!`)}
        >
          + Add
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
```

### CSS to add in App.css (under `/* ── Menu Item */`)

```css
.menu-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.menu-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  border-color: #3b82f6;
}

.menu-item__image {
  width: 90px;
  height: 90px;
  border-radius: 8px;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  flex-shrink: 0;
}

.menu-item__details {
  flex: 1;
}

.menu-item__name {
  font-size: 1.05rem;
  font-weight: 600;
}

.menu-item__desc {
  font-size: 0.85rem;
  color: #64748b;
  margin: 4px 0 8px;
}

.menu-item__price {
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a56db;
}

.menu-item__actions {
  flex-shrink: 0;
}

.btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
}

.btn--primary {
  background: #1a56db;
  color: white;
}

.btn--primary:hover {
  background: #1e40af;
}
```

> [!IMPORTANT]
> **Checkpoint!** Your app should now be fully navigable. Home → Click card → See menu items with "Add" buttons → Click "← Back" → Return home. Test all of this before moving on.

---

## Step 7: Build the Checkout Page

**File:** `src/pages/CheckoutPage.js`

For now, this page shows an empty cart state. You'll connect it to real data in Step 8.

### What you need to know

**Conditional rendering** uses the ternary operator (`condition ? showThis : showThat`) to render different JSX based on a condition.

### Code to write

```js
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  // Placeholder — replace with real cart data in Step 8
  const cart = [];

  return (
    <div className="checkout">
      <Link to="/" className="back-link">← Continue shopping</Link>
      <h1 className="checkout__title">Your Order 🧾</h1>

      {cart.length === 0 ? (
        <div className="checkout__empty">
          <div className="checkout__empty-icon">🛒</div>
          <p className="checkout__empty-text">
            Your cart is empty. Browse our cafeterias and add some meals!
          </p>
          <Link to="/" className="btn btn--primary btn--lg">
            Browse Cafeterias
          </Link>
        </div>
      ) : (
        <div className="checkout__summary">
          {/* Real cart items will go here in Step 8 */}
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
```

### CSS to add in App.css (under `/* ── Checkout Page */`)

```css
.checkout {
  max-width: 600px;
  margin: 0 auto;
}

.checkout__title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 24px;
  text-align: center;
}

.checkout__empty {
  text-align: center;
  padding: 48px;
  color: #64748b;
}

.checkout__empty-icon {
  font-size: 4rem;
  margin-bottom: 16px;
}

.checkout__empty-text {
  font-size: 1.1rem;
  margin-bottom: 24px;
}

.btn--lg {
  padding: 16px 32px;
  font-size: 1rem;
  border-radius: 12px;
}
```

---

## Step 8 (When You're Ready): Add a Cart with React Context

This is your **next milestone** after completing Steps 1–7. React Context lets you share state (like the cart) across all components without passing props through every level.

### 8a. Create the Context

Create a new file: `src/context/CartContext.js`

```js
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotal, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
```

### 8b. Wrap your app in CartProvider

In `main.jsx`, wrap `<App />` with `<CartProvider>`:

```js
import { CartProvider } from './context/CartContext.js';

// Inside render:
<CartProvider>
  <App />
</CartProvider>
```

### 8c. Use `useCart()` in MenuItem.js

```js
import { useCart } from '../context/CartContext.js';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  return (
    // ... same JSX, but change the onClick:
    <button onClick={() => addToCart(item)}>+ Add</button>
  );
};
```

### 8d. Use `useCart()` in CheckoutPage.js

Replace `const cart = [];` with:

```js
const { cart, removeFromCart, getTotal } = useCart();
```

Then map over `cart` to display items and show `getTotal()` as the order total.

---

## Reference: Key React Concepts

| Concept | What it does | Where you'll use it |
|---------|-------------|-------------------|
| `<Link to="...">` | Navigate without page reload | Header, CafeteriaCard, Back links |
| `<Outlet />` | Render the matched child route | Layout.js |
| `useParams()` | Read URL parameters like `:id` | CafeteriaMenuPage |
| `.map()` | Render a list of components | HomePage (cards), MenuPage (items) |
| Props `({ prop })` | Receive data from parent | CafeteriaCard, MenuItem |
| Conditional render | Show different UI based on state | CheckoutPage |
| `createContext()` | Share state across components | CartContext (Step 8) |
| `useState()` | Create reactive state | CartContext (Step 8) |

---

## Reference: data.json Shape

```
{
  "cafeterias": [
    {
      "id": "cafe-1",
      "name": "The Quad Grill",
      "description": "...",
      "rating": 4.5,
      "deliveryTime": "15–25 min",
      "menu": [
        { "id": "item-1", "name": "Smoky Beef Burger", "price": 450, ... },
        { "id": "item-2", "name": "Grilled Chicken Wrap", "price": 350, ... },
        { "id": "item-3", "name": "Tropical Mango Smoothie", "price": 200, ... }
      ]
    },
    {
      "id": "cafe-2",
      "name": "Madaraka Bites",
      ...
    }
  ]
}
```

---

## Suggested Team Task Split

| Member | Pages/Components | Steps |
|--------|-----------------|-------|
| Member A | Header.js + Layout.js | Steps 1–2 |
| Member B | HomePage.js + CafeteriaCard.js | Steps 3–4 |
| Member C | CafeteriaMenuPage.js + MenuItem.js | Steps 5–6 |
| Member D | CheckoutPage.js + CartContext | Steps 7–8 |

> [!IMPORTANT]
> **Work in order.** Steps 1–2 must be done first so the layout is visible. Then Steps 3–6 can be done in parallel. Step 7–8 comes last.

---

## Enhancements to Add Later

Once the base app works, here are ideas to level up:

- **Search bar** in the hero section to filter cafeterias
- **Category filter tabs** on the menu page ("All", "Main", "Drink")
- **Real images** — put `.jpg` files in `public/images/` and use `<img>` tags
- **Quantity selector** (+ / - buttons) on each menu item
- **Order confirmation modal** when clicking "Place Order"
- **Mobile hamburger menu** for the Header on small screens
- **Responsive CSS** — add `@media (max-width: 768px)` rules
