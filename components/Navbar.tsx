"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="w-full bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
      <Link
        href="/"
        className="text-2xl font-bold tracking-wide hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-300 hover:via-pink-200 hover:to-pink-300 transition-all duration-300"
      >
        MyShop
      </Link>
      <div className="flex gap-6 items-center">
        <Link
          href="/products"
          className="hover:text-blue-300 transition-colors"
        >
          Products
        </Link>
        <Link href="/cart">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-black hover:text-blue-700"
          >
            <ShoppingCart size={18} />
            <span>Cart ({totalQuantity})</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
