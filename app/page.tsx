"use client";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-blue-300 via-white to-pink-200 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4 text-gray-900 text-center">
        Welcome to MyShop
      </h1>
      <p className="text-lg text-gray-700 text-center mb-6 max-w-xl">
        Discover amazing products and deals. Browse our collection and find your favorites!
      </p>
      <a
        href="/products"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
      >
        Shop Now
      </a>
    </div>
  );
}
