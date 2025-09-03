"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { clearCart } from "@/store/slices/cartSlice";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const USD_TO_PKR = 280;

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 9 * USD_TO_PKR;
  const taxes = 5 * USD_TO_PKR;
  const grandTotal = total * USD_TO_PKR + shipping + taxes;
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <Card className="p-8 max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-green-600 text-2xl text-center">
              🎉 Thank you for your order!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-center mb-6">
              Your order has been placed successfully.
            </p>
            <Button asChild className="w-auto">
              <a href="/products">Continue Shopping</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-6xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Input type="text" placeholder="First Name" required />
              <Input type="text" placeholder="Last Name" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input type="email" placeholder="Email" required />
              <Input type="tel" placeholder="Phone Number" required />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input type="text" placeholder="City" required />
              <Input type="text" placeholder="State" required />
              <Input type="text" placeholder="Zip Code" required />
            </div>
            <div className="flex-1">
        <Textarea
          placeholder="Enter a description..."
          className="w-full min-h-[180px] resize-none"
          required
        />
      </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Cart</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      Rs {(item.price * item.quantity * USD_TO_PKR).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>Rs {(total * USD_TO_PKR).toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>Rs {shipping.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p>Estimated Taxes</p>
                <p>Rs {taxes.toLocaleString()}</p>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>Rs {grandTotal.toLocaleString()}</p>
              </div>

              <Button type="submit" className="w-suto" onClick={handleSubmit}>
                Place Order
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
