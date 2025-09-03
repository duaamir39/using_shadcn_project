"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-blue-300 via-white to-pink-200 min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full text-center shadow-xl rounded-2xl border border-white/20 bg-white/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-5xl font-extrabold text-gray-900">
            Welcome to <span className="text-blue-600">MyShop</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-lg text-gray-700 mb-6">
            Discover amazing products and deals. Browse our collection and find your favorites!
          </p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button asChild className="px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700">
            <a href="/products">Shop Now</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
