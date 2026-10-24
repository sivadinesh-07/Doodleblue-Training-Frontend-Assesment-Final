
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  increase,
  decrease,
  removeFromCart,
  clearCart,
} from "../redux/slices/cartSlice";

import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const originalTotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * item.quantity,
    0
  );

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.price || 0);

    const discount = Math.min(
      100,
      Math.max(0, Number(item.discountPercentage || 0))
    );

    const discountedPrice =
      price - (price * discount) / 100;

    return total + discountedPrice * item.quantity;
  }, 0);

  const totalDiscount = originalTotal - subtotal;

  const handleClearCart = () => {
    if (cartItems.length === 0) return;

    const confirmClear = window.confirm(
      "Are you sure you want to clear your cart?"
    );

    if (confirmClear) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-container">

        <div className="cart-header">
          <div>
            <p className="cart-eyebrow">
              YOUR SHOPPING BAG
            </p>

            <h1>My Cart</h1>

            <p className="cart-item-count">
              {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"}
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              type="button"
              className="cart-clear-btn"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <svg
                viewBox="0 0 24 24"
                width="54"
                height="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 3h2l2.4 11.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6" />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
            </div>

            <h2>Your cart is empty</h2>

            <p>
              Looks like you haven't added anything
              to your cart yet.
            </p>

            <Link
              to="/home"
              className="cart-shop-btn"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">

            <div className="cart-products">
              {cartItems.map((item) => {
                const image =
                  Array.isArray(item.images) &&
                  item.images.length > 0
                    ? item.images[0]
                    : item.thumbnail || item.image || "";

                const price = Number(item.price || 0);

                const discount = Math.min(
                  100,
                  Math.max(
                    0,
                    Number(item.discountPercentage || 0)
                  )
                );

                const discountedPrice =
                  price - (price * discount) / 100;

                const itemTotal =
                  discountedPrice * item.quantity;

                return (
                  <div
                    className="cart-item"
                    key={item.id}
                  >
                    <Link
                      to={`/product/${item.id}`}
                      className="cart-item-image"
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={item.title || "Product"}
                        />
                      ) : (
                        <div className="cart-no-image">
                          Image unavailable
                        </div>
                      )}
                    </Link>

                    <div className="cart-item-details">
                      <p className="cart-item-category">
                        {item.category || "Electronics"}
                      </p>

                      <Link
                        to={`/product/${item.id}`}
                        className="cart-item-title"
                      >
                        {item.title || "Laptop"}
                      </Link>

                      <div className="cart-item-price">
                        <span className="cart-discounted-price">
                          ${discountedPrice.toFixed(2)}
                        </span>

                        {discount > 0 && (
                          <>
                            <span className="cart-original-price">
                              ${price.toFixed(2)}
                            </span>

                            <span className="cart-discount-badge">
                              {Math.round(discount)}% OFF
                            </span>
                          </>
                        )}
                      </div>

                      <div className="cart-item-actions">
                        <div className="cart-quantity-control">
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(decrease(item.id))
                            }
                            aria-label={`Decrease ${item.title} quantity`}
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() =>
                              dispatch(increase(item.id))
                            }
                            aria-label={`Increase ${item.title} quantity`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="cart-remove-btn"
                          onClick={() =>
                            dispatch(removeFromCart(item.id))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-total">
                      ${itemTotal.toFixed(2)}
                    </div>
                  </div>
                );
              })}

              <Link
                to="/home"
                className="cart-continue-link"
              >
                ← Continue Shopping
              </Link>
            </div>

            <aside className="cart-summary">
              <h2>Order Summary</h2>

              <div className="cart-summary-row">
                <span>Items ({totalItems})</span>
                <span>
                  ${originalTotal.toFixed(2)}
                </span>
              </div>

              <div className="cart-summary-row">
                <span>Product Discount</span>
                <span className="cart-discount-value">
                  -${totalDiscount.toFixed(2)}
                </span>
              </div>

              <div className="cart-summary-row">
                <span>Shipping</span>
                <span className="cart-free">Free</span>
              </div>

              <div className="cart-summary-divider" />

              <div className="cart-summary-total">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <button
                type="button"
                className="cart-checkout-btn"
                onClick={() =>
                  alert("Checkout functionality coming soon!")
                }
              >
                Proceed to Checkout
                <span>→</span>
              </button>

              <p className="cart-summary-note">
                Shipping is free. Taxes, if applicable,
                are not included.
              </p>
            </aside>

          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
