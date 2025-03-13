import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/Home.css';
import Typed from 'typed.js';
import '../styles/TypingEffect.css';


const Home = () => {
  const typingRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typingRef.current, {
      strings: [
        'Alaska White',
        'Black Galaxy',
        'Imperial Gold',
        'Ravishing Red',
      ],
      typeSpeed: 130,
      backSpeed: 50,
      backDelay: 2500,
      startDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      autoInsertCss: true,
      smartBackspace: true,
      onStart: (self) => {
        const cursor = document.querySelector('.typed-cursor');
        if (cursor) {
          cursor.style.display = 'inline';
          cursor.style.verticalAlign = 'baseline';
        }
      }
    });

    // Cleanup function
    return () => {
      typed.destroy();
    };
  }, []);

    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "6170b2ba-9972-4bff-a0c2-b7d256aa1ce0");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

  if (data.success) {
    setResult("Form Submitted Successfully");
    alert("Form Submitted Successfully!"); // Popup
    event.target.reset();
  } else {
    console.log("Error", data);
    setResult(data.message);
    alert("Error: " + data.message); // Popup with error message
  }
  };

  useEffect(() => {
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('.banner-item');
      parallaxElements.forEach(element => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        element.style.backgroundPositionY = `${rate}px`;
      });
      
      // Handle footer parallax effect
      const footer = document.querySelector('.footer');
      const contactContainer = document.getElementById('contact-container');
      const contactSpacer = document.getElementById('contact-spacer');
      const scrollPosition = window.scrollY;
      
      if (footer && contactContainer && contactSpacer) {
        const contactHeight = contactContainer.offsetHeight;
        const contactOffsetTop = contactContainer.offsetTop;
        
        // Store the original offset top in a data attribute if not already set
        if (!contactContainer.dataset.originalTop && !contactContainer.classList.contains('static-position')) {
          contactContainer.dataset.originalTop = contactOffsetTop;
        }
        
        // Use the stored original position or current offset
        const originalTop = parseInt(contactContainer.dataset.originalTop || contactOffsetTop);
        
        // When contact section reaches top, make it fixed
        if (scrollPosition >= originalTop - 80) {
          if (!contactContainer.classList.contains('static-position')) {
            contactContainer.classList.add('static-position');
            contactSpacer.classList.add('active');
            contactSpacer.style.height = `${contactHeight}px`;
          }
          
          // Calculate how far we've scrolled past the contact section
          const scrollPastContact = scrollPosition - originalTop;
          const triggerPoint = contactHeight * 0.3;
          
          if (scrollPastContact >= triggerPoint) {
            if (!footer.classList.contains('slide-up')) {
              requestAnimationFrame(() => {
                footer.classList.add('slide-up');
              });
            }
          } else {
            if (footer.classList.contains('slide-up')) {
              requestAnimationFrame(() => {
                footer.classList.remove('slide-up');
              });
            }
          }
        } else {
          contactContainer.classList.remove('static-position');
          contactSpacer.classList.remove('active');
          footer.classList.remove('slide-up');
        }
      }
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Sample featured products data
  const featuredProducts = [
    {
      id: 1,
      name: 'Black Galaxy',
      price: 250,
      image: '/images/brick.jpg',
      category: 'Aesthetic Black'
    },
    {
      id: 2,
      name: 'Alaska White',
      price: 350,
      image: '/images/pot-6.jpg',
      category: 'Aesthetic White'
    },
    {
      id: 3,
      name: 'Imperial Gold',
      price: 450,
      image: '/images/pot-9.png',
      category: 'Aesthetic Gold'
    },
    {
      id: 4,
      name: 'Ravishing Red',
      price: 400,
      image: '/images/brick.jpg',
      category: 'Aesthetic Red'
    }
  ];

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'Plant today for a thriving tomorrow.',
      excerpt: "At ReGreen.Earth, we believe that every action counts. Our mission is to empower individuals to make a difference through simple, effective, and engaging digital experiences. By turning tree planting into a game, we're not just saving the planet—we're making sustainability fun and accessible for all.",
      date: 'From 2021',
      image: '/images/blog-1.jpg',
      author: 'Factory Outlet Kishangarh',
      link: 'https://maps.app.goo.gl/BsREGc8742TajCio8'
    },
    {
      id: 2,
      title: 'Multiplying Actions, Accelerating Efforts',
      excerpt: 'We make sustainability fun and engaging through gamified experiences. Swipe to plant trees, upload pics for transparency, and earn rewards while saving the planet.',
      date: 'From 2022',
      image: '/images/blog-2.png',
      author: 'Retail Outlet Kishangarh',
      link: 'https://maps.app.goo.gl/BsREGc8742TajCio8'
    },
    {
      id: 3,
      title: 'Intergovernmental Panel on Climate Change (IPCC)',
      excerpt: 'The Intergovernmental Panel on Climate Change (IPCC) is a United Nations body that assesses climate change science. The IPCC provides scientific information to governments to help them develop climate policies.',
      date: 'From 2025',
      image: '/images/blog-3.jpg',
      author: 'Retail Outlet Vijaynagra',
      link: 'https://maps.app.goo.gl/BsREGc8742TajCio8'
    }
  ];

  return (
    <main>
      <section id="billboard">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{}}
          loop={true}
          className="main-swiper"
        >
          <SwiperSlide>
            <div className="container-fluid h-100 p-0">
              <div className="row h-100 g-0">
                <div className="col-md-12 h-100">
                  <div 
                    className="banner-item" 
                    style={{
                      backgroundImage: `url(${require("../assets/images/home-back1.jpg")})`,
                    }}
                  >
                    <div className="typing-effect-container">
                      <div className="typing-row">
                        <span className="static-text">OUR COLLECTION INCLUDES</span>
                        <div className="highlight-container">
                          <span className="highlight" ref={typingRef}></span>
                          <span className="static-solutions">Granite</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="padding-large">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-header text-center mb-5">
                <h2 className="display-3 text-uppercase">Premium Collection</h2>
                <p>Discover our handpicked selection of premium granites.</p>
              </div>
            </div>
          </div>
          <div className="row">
            {featuredProducts.map(product => (
              <div key={product.id} className="col-md-6 col-lg-3 mb-4">
                <div className="product-item">
                  <div className="image-holder position-relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-image img-fluid"
                    />
                    <div className="product-overlay">
                      <div className="product-actions">
                        <a href="#contact" class="add-to-cart-btn">Enquire Now</a>
                      </div>
                    </div>
                  </div>
                  <div className="product-content text-center pt-4">
                    <span className="category d-block">{product.category}</span>
                    <h3 className="product-title">
                      <a href="#">{product.name}</a>
                    </h3>
                    <span className="price">₹{product.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row mt-5">
            <div className="col-md-12 text-center">
              <a 
                href="/cart"
                className="btn btn-medium btn-arrow position-relative"
              >
                <span className="text-uppercase">View All Products</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="padding-large bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-header text-center mb-5">
                <h2 className="display-3 text-uppercase">Our Outlets</h2>
                <p>Read our latest articles about sustainability and environmental initiatives</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 blog-slider-container">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                navigation={{
                  enabled: true,
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
                pagination={{ 
                  clickable: true,
                  dynamicBullets: false
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                loop={true}
                className="blog-swiper"
              >
                {blogPosts.slice(0, 3).map(post => (
                  <SwiperSlide key={post.id}>
                    <div className="blog-item">
                      <div className="image-holder position-relative">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="blog-image img-fluid"
                        />
                        <div className="post-date">
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <div className="blog-content">
                        <div className="blog-content-upper">
                          <span className="author d-block mb-2">By {post.author}</span>
                          <h3 className="blog-title">
                            <a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a>
                          </h3>
                          <p className="excerpt">
                            {post.excerpt}
                          </p>
                        </div>
                        <a href={post.link} className="read-more" target="_blank" rel="noopener noreferrer">
                          View on Maps 
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="swiper-pagination"></div>
              </Swiper>
            </div>
          </div>
          {/* <div className="row mt-4">
            <div className="col-md-12 text-center">
              <a href="#blog" className="btn btn-medium btn-arrow">
                <span className="text-uppercase"></span>
              </a>
            </div>
          </div> */}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="padding-large">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between g-5">
            <div className="col-lg-6">
              <div className="image-holder mb-4">
                <img 
                  src="/images/about-us.jpg" 
                  alt="About AIVI" 
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="detail p-5">
                <div className="display-header">
                  <h2 className="display-2 text-uppercase text-dark pb-2">About Us</h2>
                  <p className="pb-3">
                  Golden Granites is a trusted name in the granite industry, offering premium-quality granites for retail, wholesale, and export. With godowns and outlets in Kishangarh and Vijayanagram and a factory outlet in Kishangarh, we ensure a seamless supply of a wide variety of granites.
                  </p>
                  <p>
                  Committed to excellence, Golden Granites stands for superior craftsmanship, ethical sourcing, and customer satisfaction. Whether you're looking for exquisite slabs for a luxury project or bulk orders for large-scale developments, we deliver quality that speaks for itself.
                  </p>
                  <p><b>Experience the timeless beauty of granite with Golden Granites—where quality meets trust.</b></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div id="contact-container" className="contact-container">
        <section id="contact" >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-header text-center mb-5">
                <h2 className="display-3 text-uppercase">Contact Us</h2>
                <p>We'd love to hear from you. Get in touch with us!</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="contact-info p-5 bg-light">
                <h3>Contact Information</h3>
                <p className="mb-4">Feel free to reach out to us with any questions or inquiries. We're here to help!</p>
                <div className="contact-detail">
                  <div className="d-flex mb-3">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon me-3 mt-1" />
                    <div>
                      <h5>Address</h5>
                        <p>Kishangarh, Jaipur, Rajasthan (IN)</p>
                      </div>
                  </div>
                  <div className="d-flex mb-3">
                    <FontAwesomeIcon icon={faPhone} className="contact-icon me-3 mt-1" />
                    <div>
                      <h5>Phone</h5>
                        <p>+91 9414436977</p>
                      </div>
                  </div>
                  <div className="d-flex mb-3">
                    <FontAwesomeIcon icon={faEnvelope} className="contact-icon me-3 mt-1" />
                    <div>
                      <h5>Email</h5>
                        <p>abhishekporwal836@gmail.com</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <form className="contact-form p-5 bg-light" onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="email" name="email"placeholder="Enter your email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message"  className="form-label">Message</label>
                  <textarea className="form-control" id="message" name="message" rows="5" placeholder="Enter your message" required></textarea>
                </div>
                <button type="submit" className="btn btn-medium btn-dark w-100">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      </div>
      {/* Spacer to prevent content jump when contact becomes fixed */}
    </main>
  );
};

export default Home; 