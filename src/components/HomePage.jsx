import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import "./HomePage.css";

// HomePage is what shows at the "/" route. Right now it's just the Hero
// banner, plus a couple of quick links into the other pages — but since
// it's its own component, you can add more sections here later (like a
// "featured coffees" preview) without touching Menu, About, or Contact.
function HomePage() {
  return (
    <>
      <Hero />
      <section className="home-links">
        <div className="container home-links__inner">
          <Link to="/menu" className="home-links__card">
            <h3>See the Menu</h3>
            <p>Browse every coffee we're pouring today.</p>
          </Link>
          <Link to="/about" className="home-links__card">
            <h3>Our Story</h3>
            <p>How Bean.Cafe got started, and what we believe in.</p>
          </Link>
          <Link to="/contact" className="home-links__card">
            <h3>Visit Us</h3>
            <p>Hours, location, and how to get in touch.</p>
          </Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
