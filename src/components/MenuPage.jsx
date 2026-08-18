import Menu from "./Menu.jsx";

// This page's whole job is to render the Menu section at the "/menu"
// route. It needs onAddToCart passed down from App (the same way it
// always did), just now via a page component instead of being stacked
// directly under Home.
function MenuPage({ onAddToCart }) {
  return <Menu onAddToCart={onAddToCart} />;
}

export default MenuPage;
