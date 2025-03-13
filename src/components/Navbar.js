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
    // If we're on the cart page, set active section to featured-products
    if (location.pathname === '/cart') {
      setActiveSection('featured-products');
      return;
    }

    const handleScroll = () => {
      const sections = ['billboard', 'featured-products', 'blog', 'about-us', 'contact'];
      const scrollPosition = window.scrollY + 100; // Adjusted offset for better detection

      // Find all section elements and their positions
      const sectionPositions = sections.map(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: section,
            top: rect.top + window.pageYOffset,
            bottom: rect.bottom + window.pageYOffset
          };
        }
        return null;
      }).filter(Boolean);

      // Find the current active section
      for (let i = 0; i < sectionPositions.length; i++) {
        const current = sectionPositions[i];
        const next = sectionPositions[i + 1];

        if (
          scrollPosition >= current.top &&
          (!next || scrollPosition < next.top)
        ) {
          setActiveSection(current.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);
  
  const scrollToSection = (sectionId) => {
    setShowOffcanvas(false);
    
    // If we're on the cart page and clicking shop, navigate to home page's shop section
    if (location.pathname === '/cart' && sectionId === 'featured-products') {
      window.location.href = '/#featured-products';
      return;
    }
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Increased offset for better positioning
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
                  onClick={() => scrollToSection('featured-products')} 
                  className={`me-4 ${activeSection === 'featured-products' || location.pathname === '/cart' ? 'active' : ''}`}
                >
                  Shop
                </Nav.Link>
                <Nav.Link 
                  onClick={() => scrollToSection('blog')} 
                  className={`me-4 ${activeSection === 'blog' ? 'active' : ''}`}
                >
                  Outlets
                </Nav.Link>
                <Nav.Link 
                  onClick={() => scrollToSection('about-us')} 
                  className={`me-4 ${activeSection === 'about-us' ? 'active' : ''}`}
                >
                  About Us
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