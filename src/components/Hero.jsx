import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow">COZY COFFEE · Est. 2026</p>
          <h1 className="hero__title">
            Sourced with passion.
            <br />
            <em>Served</em> with Love.
          </h1>
          <p className="hero__body">
            Bean.Cafe is a neighborhood coffee. Come sit at our coffee shop, and
            taste the difference in flavor.
          </p>
          <a className="hero__cta" href="#menu">
            See the menu
          </a>
        </div>

        {/* The stamp / seal — our signature visual element */}
        <div className="hero__seal" aria-hidden="true">
          <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="110"
              cy="110"
              r="104"
              fill="none"
              stroke="var(--amber)"
              strokeWidth="2"
            />
            <circle
              cx="110"
              cy="110"
              r="90"
              fill="none"
              stroke="var(--amber)"
              strokeWidth="1"
            />
            <path
              id="sealTextPath"
              d="M 110,20 A 90,90 0 1 1 109.9,20"
              fill="none"
            />
            <text
              fontFamily="var(--font-mono)"
              fontSize="11"
              letterSpacing="3"
              fill="var(--amber)"
            ></text>
            {/* simple bean icon in the center */}
            <g transform="translate(110,110)">
              <ellipse rx="26" ry="38" fill="var(--rust)" opacity="0.85" />
              <path
                d="M0,-38 C10,-20 10,20 0,38"
                stroke="var(--espresso)"
                strokeWidth="3"
                fill="none"
              />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Hero;
