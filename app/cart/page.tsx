"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/store/slices/cartSlice";
import Link from "next/link";
const USD_TO_PKR = 280; 

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4 text-lg">Your cart is empty.</p>
        <Link
          href="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border p-4 rounded-lg"
        >
          <div className="flex items-center space-x-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h2 className="font-semibold">{item.title}</h2>
 <p className="text-green-600 font-bold">
                  Rs {(item.price * USD_TO_PKR).toLocaleString()}
                </p>            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={() => dispatch(decreaseQuantity(item.id))}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={() => dispatch(increaseQuantity(item.id))}
            >
              +
            </button>
          </div>

          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-6 flex justify-between items-center">
         <div className="text-right mt-6 font-bold text-xl">
          Total: Rs {(total * USD_TO_PKR).toLocaleString()}
        </div>
        <Link
          href="/checkout"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
