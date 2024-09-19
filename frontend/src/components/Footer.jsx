import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/adminpage") {
    return null;
  }

  return (
    <>
      <footer className="footer">
        <div className="grid">
          <div className="grid-item">
            <h4>Quick Links</h4>
            <nav className="nav">
              <Link to="/reservations" className="link">
                Reservations
              </Link>
              <Link to="/services" className="link">
                Services
              </Link>

              <Link to="/about" className="link">
                About
              </Link>
            </nav>
          </div>
          <div className="grid-itemc">
            <h4>Contact</h4>
            <div className="contact">
              <div className="contact-item">
                <svg
                  className="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <Link to="tel:91 9876543210" className="link">
                  +91 9876543210
                </Link>
              </div>
              <div className="contact-item">
                <svg
                  className="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <Link to="mailto:>techtitans@gmail.com" className="link">
                  techtitans@gmail.com
                </Link>
              </div>
            </div>
          </div>
          <div className="grid-itemb">
            <h4>Legal</h4>
            <nav className="navb">
              <Link to="/" className="link">
                Terms & Condition
              </Link>
              <Link to="/" className="link">
                Privacy Policy
              </Link>
              <Link to="/" className="link">
                Community
              </Link>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Hostel System. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
