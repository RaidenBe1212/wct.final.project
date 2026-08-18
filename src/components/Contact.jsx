import { useState } from "react";
import "./Contact.css";

const hours = [
  { day: "Monday - Friday", time: "7:00 AM - 6:00 PM" },
  { day: "Saturday", time: "7:00 AM - 9:00 PM" },
  { day: "Sunday", time: "7:00 AM - 10:00 PM" },
];

function Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="contact" id="contact">
      <div className="container contact__inner">
        {/* Contact information */}
        <div className="contact__info">
          <p className="section-eyebrow">Contact Us</p>

          <h2 className="section-title">Come sit at our coffee shop</h2>

          <p className="contact__address">PreakThmei, Kohthom, Kandal</p>

          <div className="contact__details">
            <p>
              <strong>Phone:</strong> 0716 81 31 71
            </p>

            <p>
              <strong>Email:</strong> Vathanak12000@gmail.com
            </p>
          </div>

          <div className="contact__hours">
            <h3>Opening Hours</h3>

            <ul>
              {hours.map((row) => (
                <li key={row.day}>
                  <span>{row.day}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter form */}
        <div className="contact__form-wrap">
          <h3 className="contact__form-title">Stay in the loop</h3>

          <p className="contact__form-description">
            Get notified about new flavors, seasonal drinks, and special offers.
          </p>

          {submitted ? (
            <p className="contact__success">
              Thanks! We'll let you know about our new flavors.
            </p>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />

              <button type="submit">Notify me</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
