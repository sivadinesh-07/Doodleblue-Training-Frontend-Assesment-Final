
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/slices/productsSlice";

import "./Landing.css";

function Landing() {
  const dispatch = useDispatch();

  const { items, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const featuredProducts = items.slice(0, 4);

  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero-content">
          <span className="landing-eyebrow">
            YOUR NEXT LAPTOP STARTS HERE
          </span>

          <h1>
            Power your
            <br />
            <span>everyday.</span>
          </h1>

          <p className="landing-hero-description">
            Discover laptops built for your work,
            creativity, studies, and everything
            in between.
          </p>

          <div className="landing-hero-actions">
            <Link to="/home" className="landing-shop-btn">
              Shop Laptops
              <span>→</span>
            </Link>

            <span className="landing-hero-note">
              Find your perfect match
            </span>
          </div>

          <div className="landing-hero-features">
            <div>
              <span className="landing-feature-icon">✓</span>
              <span>Quality picks</span>
            </div>

            <div>
              <span className="landing-feature-icon">✓</span>
              <span>Easy shopping</span>
            </div>

            <div>
              <span className="landing-feature-icon">✓</span>
              <span>Everyday tech</span>
            </div>
          </div>
        </div>

        <div className="landing-hero-visual">
          <div className="landing-hero-glow"></div>

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWC2-veP8Qr3eezENE6Tg1vTnWgQUNxOMhF4i1wsrOHw&s=10"
            alt="Laptop displayed on a clean desk"
            className="landing-hero-image"
          />

          <div className="landing-image-label">
            <span className="landing-label-dot"></span>
            Find your everyday essential
          </div>
        </div>
      </section>

      <section className="landing-featured">
        <div className="landing-section-heading">
          <div>
            <span className="landing-section-eyebrow">
              HANDPICKED FOR YOU
            </span>

            <h2>Featured laptops</h2>

            <p>
              Explore some of our laptop picks.
            </p>
          </div>

          <Link to="/home" className="landing-view-all">
            View all laptops <span>→</span>
          </Link>
        </div>

        {status === "loading" && (
          <div className="landing-message">
            <div className="landing-loader"></div>
            <p>Finding your perfect laptop...</p>
          </div>
        )}

        {status === "failed" && (
          <div className="landing-message landing-error">
            <p>{error || "Unable to load laptops."}</p>

            <button
              type="button"
              onClick={() => dispatch(fetchProducts())}
            >
              Try again
            </button>
          </div>
        )}

        {status === "succeeded" && items.length === 0 && (
          <div className="landing-message">
            <p>No laptops are available right now.</p>
          </div>
        )}

        {status === "succeeded" && featuredProducts.length > 0 && (
          <div className="landing-product-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        <div className="landing-bottom-cta">
          <div>
            <h3>Still exploring?</h3>
            <p>
              Browse our collection and find the right fit for you.
            </p>
          </div>

          <Link to="/home" className="landing-bottom-btn">
            Explore all laptops →
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Landing;
