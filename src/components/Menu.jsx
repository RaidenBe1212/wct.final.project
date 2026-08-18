import { useEffect, useMemo, useState } from "react";
import MenuItem from "./MenuItem.jsx";
import { supabase } from "../lib/supabaseClient.js";
import "./Menu.css";

function Menu({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // 'All' is always the first tab; activeCategory tracks which tab is selected.
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchProducts() {
      const { data, error: fetchError } = await supabase
        .from("products")
        .select("*")
        .order("category", { ascending: true })
        .order("id", { ascending: true });

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  // Build the list of tabs from whatever categories actually exist in the
  // data — so adding a brand-new category to a product automatically
  // creates a new tab, with no code changes needed.
  const categories = useMemo(() => {
    const unique = [...new Set(products.map((item) => item.category))];
    return ["All", ...unique];
  }, [products]);

  const visibleProducts =
    activeCategory === "All"
      ? products
      : products.filter((item) => item.category === activeCategory);

  return (
    <section className="menu" id="menu">
      <div className="container">
        <p className="section-eyebrow">On the board</p>
        <h2 className="section-title">Today's Menu</h2>
        <p className="section-lede">
          This is our lists where you can order your coffee
        </p>

        {loading && <p className="menu__status">Loading menu…</p>}
        {error && (
          <p className="menu__status menu__status--error">
            Couldn't load the menu: {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="menu__tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    category === activeCategory
                      ? "menu__tab menu__tab--active"
                      : "menu__tab"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="menu__grid">
              {visibleProducts.map((item) => (
                <MenuItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  origin={item.origin}
                  notes={item.notes}
                  price={Number(item.price)}
                  imageUrl={item.image_url}
                  onAdd={onAddToCart}
                  category={item.category}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Menu;
