import "./About.css";

function About() {
  return (
    <section className="about" id="about">
      <div className="container about__inner">
        <div className="about__art" aria-hidden="true">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="10"
              y="10"
              width="180"
              height="180"
              fill="none"
              stroke="var(--amber)"
              strokeWidth="1.5"
            />
            <ellipse
              cx="100"
              cy="100"
              rx="46"
              ry="64"
              fill="var(--rust)"
              opacity="0.9"
            />
            <path
              d="M100,36 C114,68 114,132 100,164"
              stroke="var(--espresso)"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        </div>
        <div>
          <p className="section-eyebrow">Our story</p>
          <h2 className="section-title">From Dream to Reality</h2>
          <p className="about__body">
            Our dream was to build a place where people could meet, study, work,
            and enjoy good coffee.
          </p>
          <p className="about__body">
            Our idea started from our love of coffee and our dream of creating a
            cozy place for everyone. We wanted to give people a comfortable
            space to enjoy their coffee, spend time with friends, and take a
            break from their busy lives.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
