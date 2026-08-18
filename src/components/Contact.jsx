import { useState } from "react";
import "./Contact.css";

const hours = [
  { day: "Mon - Fri", time: "7:00am - 6:00pm" },
  { day: "Saturday", time: "7:00am - 9:00pm" },
  { day: "Sunday", time: "7:00am - 10:00pm" },
];

function Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="contact" id="contact">
      <div className="container contact__inner">
        <div>
          <p className="section-eyebrow">Visit us</p>
          <h2 className="section-title">Come sit at our coffee shop</h2>
          <p className="contact__address">PreakThmei, Kohthom, Kandal</p>
          <p className="contact__number">0716 81 31 71</p>
          <p className="contact__gmail">Vathanak12000@gmail.com</p>

          <ul className="contact__hours">
            {hours.map((row) => (
              <li key={row.day}>
                <span>{row.day}</span>
                <span>{row.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact__form-wrap">
          <h3 className="contact__form-title">Get notified about new Flavor</h3>

          {submitted ? (
            <p className="contact__success">
              Thanks — we'll let you know when we have a new Flavor.
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
