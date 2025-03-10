import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLinkedin, 
  faTwitter, 
  faInstagram, 
  faYoutube,
  faGooglePlay,
  faAppStore
} from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';

const Footer = () => {
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // Get the element to scroll to
    const element = document.getElementById(sectionId);
    if (element) {
      // Add a small delay to ensure DOM updates
      setTimeout(() => {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  return (
    <footer className="footer text-white">
      <Container>
        <Row className="padding-medium justify-content-between">
          <Col lg={2} md={4} sm={6} className="footer-menu">
            <h5 className="widget-title text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <button onClick={() => scrollToSection('billboard')} className="footer-link">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about-us')} className="footer-link">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('featured-products')} className="footer-link">
                  Shop
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('blog')} className="footer-link">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="footer-link">
                  Contact
                </button>
              </li>
            </ul>
          </Col>
          

          <Col lg={2} md={4} sm={6} className="footer-menu">
            <h5 className="widget-title text-uppercase">Help Desk</h5>
            <ul className="list-unstyled">
              <li>
                <button onClick={() => scrollToSection('faq')} className="footer-link">
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => window.location.href = 'https://dev.regreen.earth/privacy-policy'}
                  className="footer-link"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href = 'https://dev.regreen.earth/terms-and-conditions'} className="footer-link">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} sm={6} className="footer-menu">
            <h5 className="widget-title text-uppercase">Contact Us</h5>
            <ul className="list-unstyled contact-info">
              <li>Email: abhishekporwal836@gmail.com</li>
              <li>Phone: +91 9414436977</li>
              <li className="address">Address: Kishangarh, Jaipur, Rajasthan (IN)</li>
            </ul>
          </Col>
          
          <Col lg={2} md={6} sm={6} className="footer-menu">
            <h5 className="widget-title text-uppercase">Follow Us</h5>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/abhishek-porwal-015517226/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </Col>
        </Row>
        
        <Row className="footer-bottom">
          <Col className="text-center py-3">
            <p className="mb-0">
              © {new Date().getFullYear()} Golden Granites Private Limited All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 