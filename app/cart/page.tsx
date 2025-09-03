"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/store/slices/cartSlice";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const USD_TO_PKR = 280;

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center space-y-4">
        <p className="text-lg">Your cart is empty.</p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <p className="text-gray-600">{cartItems.length} Items</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Product Details</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={item.image} alt={item.title} />
                    <AvatarFallback>{item.title.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-500">{item.category || "Product"}</p>
                    <Button
                      variant="link"
                      className="text-red-500 px-0"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </TableCell>

              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </Button>
                </div>
              </TableCell>

              <TableCell className="text-center font-medium">
                Rs {(item.price * USD_TO_PKR).toLocaleString()}
              </TableCell>

              <TableCell className="text-center font-bold">
                Rs {(item.price * item.quantity * USD_TO_PKR).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Separator />

      <div className="flex justify-between items-center">
        <Button variant="link" asChild>
          <Link href="/products">← Continue Shopping</Link>
        </Button>

        <div className="text-right">
          <p className="text-lg font-bold">
            Total: Rs {(total * USD_TO_PKR).toLocaleString()}
          </p>
          <Button asChild className="mt-2 bg-green-600 hover:bg-green-700">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
