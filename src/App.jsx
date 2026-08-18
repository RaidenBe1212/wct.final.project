import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { supabase } from "./lib/supabaseClient.js";
import AuthScreen from "./components/AuthScreen.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Cart from "./components/Cart.jsx";
import HomePage from "./components/HomePage.jsx";
import MenuPage from "./components/MenuPage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import ContactPage from "./components/ContactPage.jsx";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("idle");

  async function loadUserProfile(authUser) {
    if (!authUser) {
      setUser(null);
      return;
    }
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authUser.id)
      .single();

    if (error) {
      console.error("Could not load profile:", error.message);
      setUser({ id: authUser.id, email: authUser.email, role: "customer" });
      return;
    }

    setUser({ id: authUser.id, email: authUser.email, role: data.role });
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      loadUserProfile(session?.user ?? null).then(() =>
        setCheckingSession(false),
      );
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        loadUserProfile(session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  function addToCart(item) {
    setCart((current) => {
      const existing = current.find((line) => line.id === item.id);
      if (existing) {
        return current.map((line) =>
          line.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...current, { ...item, qty: 1 }];
    });
    setOrderStatus("idle");
    setIsCartOpen(true);
  }

  function increaseQty(id) {
    setCart((current) =>
      current.map((line) =>
        line.id === id ? { ...line, qty: line.qty + 1 } : line,
      ),
    );
  }

  function decreaseQty(id) {
    setCart((current) =>
      current
        .map((line) => (line.id === id ? { ...line, qty: line.qty - 1 } : line))
        .filter((line) => line.qty > 0),
    );
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((line) => line.id !== id));
  }

  async function handleCheckout() {
    if (cart.length === 0 || !user) return;
    setOrderStatus("placing");

    const total = cart.reduce((sum, line) => sum + line.price * line.qty, 0);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({ user_id: user.id, total, status: "completed" })
      .select()
      .single();

    if (orderError) {
      console.error("Order failed:", orderError.message);
      setOrderStatus("error");
      return;
    }

    const orderItems = cart.map((line) => ({
      order_id: order.id,
      product_id: line.id,
      product_name: line.name,
      price: line.price,
      qty: line.qty,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Order items failed:", itemsError.message);
      setOrderStatus("error");
      return;
    }

    setOrderStatus("success");
    setCart([]);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  if (checkingSession) {
    return null;
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      {/* Routes picks ONE of these to render, based on the current URL —
          this is what replaces the old "stack every section on one page"
          layout with real, separate pages. */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage onAddToCart={addToCart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <Footer />

      <Cart
        items={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
        orderStatus={orderStatus}
      />
    </>
  );
}

export default App;
