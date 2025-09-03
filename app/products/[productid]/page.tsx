"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category?: string;
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
        if (!res.ok)
          throw new Error(`Failed to fetch product (status ${res.status})`);
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

  if (loading)
    return <p className="text-center mt-8">Loading product...</p>;
  if (error || !product)
    return (
      <p className="text-red-500 text-center mt-8">
        {error || "Product not found"}
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto  p-6">
      <Card className="flex flex-col md:flex-row gap-8 shadow-lg rounded-2xl overflow-hidden">
        {/* Image Section */}
        <CardHeader className="md:w-1/2 flex items-center justify-center bg-gray-50 p-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-80 object-contain rounded-lg"
          />
        </CardHeader>

        {/* Details Section */}
        <CardContent className="flex-1 flex flex-col justify-between p-6">
          <div>
            <CardTitle className="text-2xl font-bold mb-4">
              {product.title}
            </CardTitle>
            {product.category && (
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
            )}
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>
            <p className="text-2xl font-bold text-green-600 mb-6">
              Rs {(product.price * USD_TO_PKR).toLocaleString()}
            </p>
          </div>

          <CardFooter className="flex gap-4 p-0">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 w-auto"
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
        </CardContent>
      </Card>
    </div>
  );
}
