"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { clearCart } from "@/store/slices/cartSlice";
import { useState } from "react";

const USD_TO_PKR = 280;

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-4 text-green-600">🎉 Thank you for your order!</h1>
        <p className="text-gray-700 mb-6">
          Your order has been placed successfully.
        </p>
        <a
          href="/products"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Shipping Address"
            className="w-full px-4 py-2 border rounded"
            required
          />

          <h2 className="text-xl font-bold mt-4 text-gray-900">
            Total: Rs {(total * USD_TO_PKR).toLocaleString()}
          </h2>

          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between border-b py-2">
                <span>{item.title} x {item.quantity}</span>
                <span>Rs {(item.price * item.quantity * USD_TO_PKR).toLocaleString()}</span>
              </li>
            ))}
          </ul>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition"
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
}
