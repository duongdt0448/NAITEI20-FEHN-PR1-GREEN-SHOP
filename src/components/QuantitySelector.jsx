import { useState } from "react";

function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="flex items-center space-x-4">
      <span>Số lượng</span>
      <button
        className="px-2 py-1 border rounded border-gray-300 hover:bg-gray-100 w-10 h-10"
        onClick={decreaseQuantity}
      >
        -
      </button>
      <button className="px-2 py-1 border rounded border-gray-300 hover:bg-gray-100 w-20 h-10">
        {quantity}
      </button>
      <button
        className="px-2 py-1 border rounded border-gray-300 hover:bg-gray-100 w-10 h-10"
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
