import React, { useEffect, useState } from "react";
import "../styles/Cart.css";

const SHEET_ID = "1JpsHU7Uv6ABVNqhyh-enPkUF-RMFg1M2Nsmy4uk3meo";  
const API_KEY = "AIzaSyC_dcp5ZChaEONiQrCDbKqtC7FcinNd5_g";        
const RANGE = "Sheet1!A2:D"; 

// Replace these with your Cloudinary credentials
const CLOUDINARY_CLOUD_NAME = "dle3xxq9h";
const CLOUDINARY_UPLOAD_PRESET = "gg-sample";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const optimizeCloudinaryUrl = (url) => {
      if (!url) return "";
      try {
        // Add quality and format optimization parameters to the URL
        return url.replace('/upload/', '/upload/q_auto,f_auto/');
      } catch (error) {
        console.error('Error optimizing URL:', error);
        return url;
      }
    };

    const fetchSheetData = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch spreadsheet data');
        }

        const data = await response.json();

        if (data.values && isMounted) {
          const totalProducts = data.values.length;
          const formattedProducts = [];

          for (let i = 0; i < data.values.length; i++) {
            const row = data.values[i];
            const imageUrl = row[0] ? optimizeCloudinaryUrl(row[0].trim()) : "";
            
            // Update progress
            if (isMounted) {
              setUploadProgress(Math.round(((i + 1) / totalProducts) * 100));
            }

            formattedProducts.push({
              id: i + 1,
              image: imageUrl,
              name: row[1] || "Unknown Variety",
              price: row[2] ? parseFloat(row[2]).toFixed(2) : "0.00",
              extra: row[3] || "",
            });
          }

          if (isMounted) {
            setProducts(formattedProducts);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        if (isMounted) {
          setError(error.message || "Failed to load products. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setUploadProgress(0);
        }
      }
    };

    fetchSheetData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main>
      <section className="all-products padding-large">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-header text-center mb-5">
                <h2 className="display-3 text-uppercase">All Products</h2>
                <p>Explore our complete collection of Single Use Plastic Upcycled Products</p>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="progress mt-3">
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{ width: `${uploadProgress}%` }}
                      aria-valuenow={uploadProgress} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    >
                      {uploadProgress}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            {loading ? (
              <p className="text-center">Loading products...</p>
            ) : error ? (
              <p className="text-center text-danger">{error}</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="col-md-6 col-lg-3 mb-4">
                  <div className="product-item">
                    <div className="image-holder position-relative">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product-image img-fluid"
                          style={{ 
                            width: '100%',
                            backgroundColor: '#f5f5f5'
                          }}
                          loading="lazy"
                          onError={(e) => {
                            console.error('Image failed to load:', product.image);
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGNUY1RjUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY2NiIgZm9udC1zaXplPSIxNnB4IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+Tm8gSW1hZ2UgQXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==';
                          }}
                        />
                      ) : (
                        <div className="no-image">No Image Available</div>
                      )}
                      <div className="product-overlay">
                        <div className="product-actions">
                          <a href="#contact" className="add-to-cart-btn">Enquire Now</a>
                        </div>
                      </div>
                    </div>
                    <div className="product-content text-center pt-4">
                      <h3 className="product-title">
                        <a href="#">{product.name}</a>
                      </h3>
                      <span className="price">₹{product.price}</span>
                      {product.extra && <p className="extra">{product.extra}</p>}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
