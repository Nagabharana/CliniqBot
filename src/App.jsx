// ─────────────────────────────────────────────────────────────────────────────
// src/App.jsx
// Root component — handles page routing via state, injects global styles,
// renders the layout shell (HexPattern, Navbar, page, Footer).
//
// To add a new page:
//   1. Create src/pages/NewPage.jsx
//   2. Import it here
//   3. Add a case to the page renderer below
//   4. Add to NAV_LINKS in src/data/constants.js
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { injectGlobalStyles } from "./styles/globalStyles";
import HexPattern from "./components/HexPattern";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import About from "./pages/About";

// ── Page registry — add new pages here ───────────────────────────────────────
const PAGES = {
  home:  (props) => <Landing {...props} />,
  chat:  ()      => <Chat />,
  about: ()      => <About />,
};

export default function App() {
  const [page, setPage] = useState("home");

  // Inject global CSS once on mount
  useEffect(() => {
    injectGlobalStyles();
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const PageComponent = PAGES[page] ?? PAGES.home;
  const showFooter = page !== "chat";

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", position: "relative" }}>
      {/* Background */}
      <HexPattern />

      {/* App shell */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar page={page} setPage={setPage} />
        <main>
          <PageComponent setPage={setPage} />
        </main>
        {showFooter && <Footer setPage={setPage} />}
      </div>
    </div>
  );
}
