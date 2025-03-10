import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Offcanvas, Button, NavDropdown } from 'react-bootstrap';
import '../styles/Navbar.css';
import logo from '../assets/images/aivi-logo.png';

const Navbar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [activeSection, setActiveSection] = useState('billboard');
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['billboard', 'quick-nav', 'about-us', 'featured-products', 'blog', 'contact'];
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.3; // 30% of viewport height

      for (const section of sections.reverse()) { // Check from bottom to top
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= threshold) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToSection = (sectionId) => {
    // Close mobile menu if open
    setShowOffcanvas(false);
    
    // Update active section immediately on click
    setActiveSection(sectionId);
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // Get the element to scroll to
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 55;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navigateToProduct = (index) => {
    setShowOffcanvas(false);
    if (location.pathname !== "/") {
      window.location.href = "/";
      setTimeout(() => {
        const swiper = document.querySelector('.swiper').swiper;
        swiper.slideTo(index);
      }, 500);
    } else {
      const swiper = document.querySelector('.swiper').swiper;
      swiper.slideTo(index);
    }
  };

  return (
    <header className="site-header text-black">
      <BootstrapNavbar expand="lg" className="px-3 mb-3">
        <Container fluid>
          <BootstrapNavbar.Brand 
            as={Link} 
            to="/" 
            className="logo-text"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            GOLDEN GRANITES
          </BootstrapNavbar.Brand>
          
          <BootstrapNavbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={() => setShowOffcanvas(true)}
          />

          <BootstrapNavbar.Offcanvas
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="logo-text">
                GOLDEN GRANITES
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="text-uppercase justify-content-end align-items-center flex-grow-1 pe-3">
                <Nav.Link 
                  onClick={() => scrollToSection('billboard')} 
                  className={`me-4 ${activeSection === 'billboard' ? 'active' : ''}`}
                >
                  Home
                </Nav.Link>
                <Nav.Link 
                  onClick={() => scrollToSection('quick-nav')} 
                  className={`me-4 ${activeSection === 'quick-nav' ? 'active' : ''}`}
                >
                  Our Solutions
                </Nav.Link>
                <Nav.Link 
                  onClick={() => scrollToSection('about-us')} 
                  className={`me-4 ${activeSection === 'about-us' ? 'active' : ''}`}
                >
                  About Us
                </Nav.Link>
                <Nav.Link 
                  onClick={() => scrollToSection('featured-products')} 
                  className={`me-4 ${activeSection === 'featured-products' ? 'active' : ''}`}
                >
                  Shop
                </Nav.Link>
                <Nav.Link 
                  onClick={() => scrollToSection('blog')} 
                  className={`me-4 ${activeSection === 'blog' ? 'active' : ''}`}
                >
                  Blog
                </Nav.Link>
                <Nav.Link 
                  onClick={() => scrollToSection('contact')}
                  className={activeSection === 'contact' ? 'active' : ''}
                >
                  Contact
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </BootstrapNavbar.Offcanvas>
        </Container>
      </BootstrapNavbar>
    </header>
  );
};

export default Navbar; 