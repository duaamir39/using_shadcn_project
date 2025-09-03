"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { AppDispatch } from "../../store/store";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const USD_TO_PKR = 280;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-4 rounded-2xl shadow-md">
            <Skeleton className="w-full h-48 mb-4 rounded-lg" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-4" />
            <Skeleton className="h-10 w-full rounded-md" />
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="flex flex-col justify-between rounded-2xl shadow-md border border-gray-200 hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 bg-white"
        >
          <CardHeader className="flex justify-center items-center p-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain"
            />
          </CardHeader>

          <CardContent>
            <CardTitle className="text-lg font-semibold line-clamp-2 mb-2">
              {product.title}
            </CardTitle>
            <p className="text-blue-600 font-bold text-lg">
              Rs {(product.price * USD_TO_PKR).toLocaleString()}
            </p>
          </CardContent>

          <CardFooter className="flex gap-2">
            <Button
              asChild
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link href={`/products/${product.id}`}>View Details</Link>
            </Button>
            <Button
              size="lg"
              className="w-1/2 bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              onClick={() =>
                dispatch(
                  addToCart({
                    ...product,
                    quantity: 1,
                  })
                )
              }
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
