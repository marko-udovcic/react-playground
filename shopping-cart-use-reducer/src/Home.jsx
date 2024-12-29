import { useReducer } from "react";
import { useState } from "react";
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { ...action.product, id: Date.now() }];
    case "remove":
      return state.filter((product) => product.id !== action.id);
    default:
      throw new Error("Invalid action");
  }
}

export default function Home() {
  const initialState = [];
  const [quantity, setQuantity] = useState(1);
  const [cart, dispatch] = useReducer(reducer, initialState);

  const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
  ];

  const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);

  function addProduct(product) {
    product = { ...product, quantity, price: product.price * quantity };
    dispatch({ type: "add", product });
  }
  return (
    <div className="bg-white p-5 w-1/2 m-auto mt-10 rounded-lg">
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="my-2 flex">
            <h2>
              {product.name} - ${product.price}
            </h2>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mx-6 bg-green-200 rounded-xl p-2"
            >
              {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <button onClick={() => addProduct(product)} className="mx-6 bg-green-200 rounded-xl p-2">
              Add to cart
            </button>
          </li>
        ))}
      </ul>
      <div className="bg-red-400 p-4 mt-4">
        <h2>Cart</h2>
        <ul>
          {cart.map((product) => (
            <li key={product.id} className="my-2">
              {product.name} - ${product.price} - {product.quantity}
              <button
                onClick={() => dispatch({ type: "remove", id: product.id })}
                className="mx-6 bg-green-200 rounded-xl p-2"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <h2 className="text-black mt-4">Total price: ${totalPrice}</h2>
      </div>
    </div>
  );
}
