import React from 'react';
import '../styles/Cart.css';

const Cart = () => {
  // Extended product list
  const allProducts = [
    {
      id: 1,
      name: 'PlastiCure 4" Pot',
      price: 250,
      image: '/images/pot-4.jpg',
      category: 'Aesthetic Pots'
    },
    {
      id: 2,
      name: 'PlastiCure 6" Pot',
      price: 350,
      image: '/images/pot-6.jpg',
      category: 'Aesthetic Pots'
    },
    {
      id: 3,
      name: 'PlastiCure 9" Pot',
      price: 450,
      image: '/images/pot-9.png',
      category: 'Aesthetic Pots'
    },
    {
      id: 4,
      name: 'Pavement Brick',
      price: 40,
      image: '/images/brick.jpg',
      category: 'Construction Supplies'
    },
    {
      id: 5,
      name: 'PlastiCure Garden Pot',
      price: 550,
      image: '/images/pot-4.jpg',
      category: 'Aesthetic Pots'
    },
    {
      id: 6,
      name: 'Decorative Planter',
      price: 650,
      image: '/images/pot-6.jpg',
      category: 'Aesthetic Pots'
    },
    {
      id: 7,
      name: 'Large Outdoor Pot',
      price: 850,
      image: '/images/pot-9.png',
      category: 'Aesthetic Pots'
    },
    {
      id: 8,
      name: 'Interlocking Brick',
      price: 45,
      image: '/images/brick.jpg',
      category: 'Construction Supplies'
    }
  ];

  return (
    <main>
      <section className="all-products padding-large">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-header text-center mb-5">
                <h2 className="display-3 text-uppercase">All Products</h2>
                <p>Explore our complete collection of Single Use Plastic Upcycled Products</p>
              </div>
            </div>
          </div>
          <div className="row">
            {allProducts.map(product => (
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
                        <a href="#contact" className="add-to-cart-btn">Enquire Now</a>
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
        </div>
      </section>
    </main>
  );
};

export default Cart; 