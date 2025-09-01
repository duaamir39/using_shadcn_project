"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

const USD_TO_PKR = 280;

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.productid;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!productId) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${productId}`);
        if (!res.ok) throw new Error(`Failed to fetch product (status ${res.status})`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setProduct(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p className="text-center mt-8">Loading product...</p>;
  if (error || !product)
    return <p className="text-red-500 text-center mt-8">{error || "Product not found"}</p>;

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <img
        src={product.image}
        alt={product.title}
        className="w-full md:w-1/2 h-80 object-contain rounded-lg"
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-green-600 mb-6">
            Rs {(product.price * USD_TO_PKR).toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
