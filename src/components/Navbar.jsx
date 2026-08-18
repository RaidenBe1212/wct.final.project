import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cartCount, onCartClick, user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Menu", to: "/menu" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  // NavLink is like Link, but it also tells you (via this function) whether
  // its own route is the one currently active, so we can highlight it.
  function linkClassName({ isActive }) {
    return isActive ? "navbar__link navbar__link--active" : "navbar__link";
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* Link (from react-router-dom) works like a normal <a> tag, but
            it navigates without a full page reload — that's the key
            difference from the <a href="..."> we used to use here. */}
        <Link to="/" className="navbar__brand">
          Bean.Cafe
        </Link>

        <nav className="navbar__links navbar__links--desktop">
          {navLinks.map((link) => (
            <NavLink key={link.label} to={link.to} className={linkClassName}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <div className="navbar__account">
            <span>
              {user.email}
              {user.role === "admin" && (
                <span className="navbar__admin-badge">Admin</span>
              )}
            </span>
            <button type="button" onClick={onLogout}>
              Log out
            </button>
          </div>

          <button
            type="button"
            className="navbar__cart"
            onClick={onCartClick}
            aria-label={`Open cart, ${cartCount} items`}
          >
            Cart
            {cartCount > 0 && (
              <span className="navbar__cart-count">{cartCount}</span>
            )}
          </button>

          <button
            className="navbar__toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="navbar__links navbar__links--mobile">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={linkClassName}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
