"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 text-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Welcome to <span className="text-blue-600">My Store</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Discover our amazing collection of tech products — laptops, smartphones,
        accessories, and more. Find everything you need in one place!
      </p>
      <Button
        asChild
        size="lg"
        className="rounded-xl px-8 py-6 text-lg shadow-md hover:shadow-lg"
      >
        <Link href="/products">Browse Products →</Link>
      </Button>
    </div>
  );
}
