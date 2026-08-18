import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>&copy; {year} Bean.Cafe</span>
        <span>Made By SAMATH VATHANA</span>
      </div>
    </footer>
  );
}

export default Footer;
