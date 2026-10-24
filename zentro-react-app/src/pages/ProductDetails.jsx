
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/slices/cartSlice";

import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const products = useSelector(
    (state) => state.products.items
  );

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <main className="product-details-page">
        <div className="product-details-message">
          <h2>Product not found</h2>
          <p>
            This laptop may be unavailable or the product
            list has not loaded yet.
          </p>
          <Link to="/home">
            Back to shopping
          </Link>
        </div>
      </main>
    );
  }

  const images = [
    ...new Set(
      [
        ...(Array.isArray(product.images)
          ? product.images
          : []),
        product.thumbnail,
        product.image,
      ].filter(
        (image) =>
          typeof image === "string" &&
          image.trim() !== ""
      )
    ),
  ];

  const mainImage = images[selectedImage] || "";

  const price = Number(product.price || 0);
  const rating = Number(product.rating || 0);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }

    setAdded(true);
  };

  return (
    <main className="product-details-page">
      <div className="product-details-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/home">Laptops</Link>
        <span>/</span>
        <span>{product.title}</span>
      </div>

      <section className="product-details-layout">
        <div className="product-details-gallery">
          <div className="product-details-main-image">
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.title || "Laptop"}
              />
            ) : (
              <div className="product-details-no-image">
                Image unavailable
              </div>
            )}

            {product.discountPercentage > 0 && (
              <span className="product-details-discount">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="product-details-thumbnails">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={
                    selectedImage === index
                      ? "product-details-thumbnail active"
                      : "product-details-thumbnail"
                  }
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={selectedImage === index}
                >
                  <img
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-details-info">
          <span className="product-details-category">
            {product.category || "Electronics"}
          </span>

          <h1>{product.title || "Laptop"}</h1>

          {product.brand && (
            <p className="product-details-brand">
              Brand: <strong>{product.brand}</strong>
            </p>
          )}

          {rating > 0 && (
            <div className="product-details-rating">
              <span>★</span>
              <strong>{rating.toFixed(1)}</strong>
              {product.reviews?.length > 0 && (
                <span>
                  ({product.reviews.length} reviews)
                </span>
              )}
            </div>
          )}

          <div className="product-details-price">
            <span>${price.toFixed(2)}</span>

            {product.discountPercentage > 0 && (
              <span className="product-details-old-price">
                $
                {(
                  price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
            )}
          </div>

          <p className="product-details-description">
            {product.description ||
              "Explore this laptop and discover its features."}
          </p>

          <div className="product-details-divider"></div>

          <div className="product-details-specs">
            {product.brand && (
              <div>
                <span>Brand</span>
                <strong>{product.brand}</strong>
              </div>
            )}

            {product.category && (
              <div>
                <span>Category</span>
                <strong>{product.category}</strong>
              </div>
            )}

            {product.stock !== undefined && (
              <div>
                <span>Availability</span>
                <strong
                  className={
                    product.stock > 0
                      ? "product-in-stock"
                      : "product-out-stock"
                  }
                >
                  {product.stock > 0
                    ? "In stock"
                    : "Out of stock"}
                </strong>
              </div>
            )}

            {product.warrantyInformation && (
              <div>
                <span>Warranty</span>
                <strong>
                  {product.warrantyInformation}
                </strong>
              </div>
            )}
          </div>

          <div className="product-details-divider"></div>

          <div className="product-details-quantity">
            <span>Quantity</span>

            <div className="product-details-quantity-control">
              <button
                type="button"
                onClick={() =>
                  setQuantity((previous) =>
                    Math.max(1, previous - 1)
                  )
                }
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((previous) => previous + 1)
                }
                aria-label="Increase quantity"
                disabled={
                  Number.isFinite(Number(product.stock)) &&
                  Number(product.stock) >= 0 &&
                  quantity >= Number(product.stock)
                }
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            className="product-details-add-btn"
            onClick={handleAddToCart}
            disabled={
              product.stock !== undefined &&
              Number(product.stock) <= 0
            }
          >
            {product.stock !== undefined &&
            Number(product.stock) <= 0
              ? "Out of stock"
              : added
                ? "Add more to cart"
                : "Add to cart"}
          </button>

          {added && (
            <p className="product-details-success">
              ✓ Added to your cart successfully.
            </p>
          )}

          <Link
            to="/cart"
            className="product-details-cart-link"
          >
            View shopping cart →
          </Link>

          <div className="product-details-back">
            <Link to="/home">← Continue shopping</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
