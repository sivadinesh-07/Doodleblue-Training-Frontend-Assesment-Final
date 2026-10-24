
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  increase,
  decrease,
} from "../redux/slices/cartSlice";
import "./ProductCard.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  const image =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : product.thumbnail || product.image || "";

  const price = Number(product.price || 0);
  const rating = Number(product.rating || 0);
  const productTitle = product.title || "Laptop";

  return (
    <article className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-card-image-link"
      >
        <div className="product-card-image">
          {image ? (
            <img
              src={image}
              alt={productTitle}
              loading="lazy"
            />
          ) : (
            <div className="product-card-no-image">
              Image unavailable
            </div>
          )}

          {product.discountPercentage > 0 && (
            <span className="product-card-discount">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}
        </div>
      </Link>

      <div className="product-card-content">
        <p className="product-card-category">
          {product.category || "Electronics"}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="product-card-title-link"
        >
          <h3 className="product-card-title">
            {productTitle}
          </h3>
        </Link>

        {rating > 0 && (
          <div className="product-card-rating">
            <span className="product-card-star">★</span>
            <span>{rating.toFixed(1)}</span>

            {product.reviews?.length > 0 && (
              <span className="product-card-reviews">
                ({product.reviews.length})
              </span>
            )}
          </div>
        )}

        <div className="product-card-bottom">
          <div className="product-card-price">
            <span className="product-card-current-price">
              ${price.toFixed(2)}
            </span>
          </div>

          {quantity === 0 ? (
            <button
              type="button"
              className="product-card-add-btn"
              onClick={() => dispatch(addToCart(product))}
            >
              <span>+</span>
              Add
            </button>
          ) : (
            <div className="product-card-quantity">
              <button
                type="button"
                onClick={() => dispatch(decrease(product.id))}
                aria-label={`Decrease ${productTitle} quantity`}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() => dispatch(increase(product.id))}
                aria-label={`Increase ${productTitle} quantity`}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
