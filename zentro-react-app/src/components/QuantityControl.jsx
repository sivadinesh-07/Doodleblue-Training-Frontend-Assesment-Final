
import "./QuantityControl.css";

function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="quantity-control">
      <button
        type="button"
        className="quantity-btn"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span className="quantity-value">
        {quantity}
      </span>

      <button
        type="button"
        className="quantity-btn"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default QuantityControl;
