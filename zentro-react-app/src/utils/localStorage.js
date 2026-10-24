
const CART_KEY = "zentro-cart";

export const getCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem(CART_KEY);

    if (!savedCart) {
      return [];
    }

    const cartItems = JSON.parse(savedCart);

    return Array.isArray(cartItems) ? cartItems : [];
  } catch {
    return [];
  }
};

export const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem(
      CART_KEY,
      JSON.stringify(cartItems)
    );
  } catch (error) {
    console.error("Unable to save cart", error);
  }
};

export const clearCartFromStorage = () => {
  try {
    localStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error("Unable to clear cart", error);
  }
};
