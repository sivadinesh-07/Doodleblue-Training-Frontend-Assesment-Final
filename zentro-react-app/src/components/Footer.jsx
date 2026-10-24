
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="zentro-footer">
      <div className="footer-container">

        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/home" className="footer-logo">
              zentro<span>.</span>
            </Link>

            <p className="footer-description">
              Technology for your next move.
              <br />
              Smart choices. Better technology.
            </p>

            <a
              href="mailto:support@zentro.com"
              className="footer-contact-link"
            >
              Get in touch <span>↗</span>
            </a>
          </div>

          {/* Explore */}
          <div className="footer-links">
            <h3>Discover</h3>
            <Link to="/home">Home</Link>
            <Link to="/home">Laptops</Link>
            <Link to="/cart">Shopping Cart</Link>
          </div>

          {/* Support */}
          <div className="footer-links">
            <h3>Support</h3>
            <a href="mailto:support@zentro.com">
              Contact Us
            </a>
            <Link to="/cart">Your Orders</Link>
            <Link to="/home">Continue Shopping</Link>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Zentro.
            All rights reserved.
          </p>

          <p>Made for everyday tech.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
