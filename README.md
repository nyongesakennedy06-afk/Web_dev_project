# StratsBites 🎓🍔

A campus food delivery MVP built with React, Vite, and React Router for Strathmore University cafeterias.

This is a group project designed to practice core React concepts (components, routing, props, state, context) and Git/GitHub collaboration workflows.

---

## 📖 Quick Start Documentation

To guide your development, we have prepared two detailed guides:

1.  **[StratsBites Build Guide (Step-by-Step)](STRATSBITES_BUILD_GUIDE.md)**: Explains what to build in each file, the React concepts behind it, the code templates, and corresponding styles.
2.  **[Team Collaboration & Git Workflow Guide](TEAM_COLLABORATION_GUIDE.md)**: Suggests how to divide the work among the 4 members, how to use feature branches, and how to coordinate merges on GitHub.

---

## 🛠️ Tech Stack & Commands

*   **Framework:** React (Vite-based)
*   **Routing:** React Router v7 (`react-router-dom`)
*   **Styling:** Vanilla CSS (written in `src/App.css` and `src/index.css`)

### Local Development

1.  Clone the repository and install the dependencies:
    ```bash
    git clone https://github.com/nyongesakennedy06-afk/Web_dev_project.git
    cd Web_dev_project
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
3.  Open the page in your browser at the address shown in the terminal (usually `http://localhost:5173/` or `http://localhost:5174/`).

---

## 📂 Project Structure

*   `src/components/` — Reusable elements (Header, Layout, CafeteriaCard, MenuItem)
*   `src/pages/` — Main views (HomePage, CafeteriaMenuPage, CheckoutPage)
*   `src/data/` — Static mock database (`data.json`) containing cafeteria and food items.
*   `src/App.js` — Route configuration.
*   `src/App.css` — Global CSS styling sheets.
