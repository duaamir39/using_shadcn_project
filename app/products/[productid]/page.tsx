import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
}

export default function ProductDetailPage({
  params,
}: {
  params: { productid: string };
}) {
  const { productid } = params;

  const products: Product[] = [
    {
      id: 1,
      name: "Laptop",
      description: "High performance laptop",
      price: "Rs 120000",
    },
    {
      id: 2,
      name: "Smartphone",
      description: "Latest Android smartphone",
      price: "Rs 80000",
    },
    {
      id: 3,
      name: "Headphones",
      description: "Noise-cancelling headphones",
      price: "Rs 2200",
    },
    {
      id: 4,
      name: "Smartwatch",
      description: "Feature-packed smartwatch",
      price: "Rs 15000",
    },
  ];

  const product = products.find((p) => p.id.toString() === productid);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-gray-500 text-lg">
          ❌ Product not found
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-6">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-gray-600 mt-3 leading-relaxed">
          {product.description}
        </p>

        <p className="text-2xl font-semibold text-green-600 mt-5">
          {product.price}
        </p>

        <Link
          href="/products"
          className="inline-block mt-6 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          ⬅ Back to Products
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const products: Product[] = [
   {
      id: 1,
      name: "Laptop",
      description: "High performance laptop",
      price: "Rs 120000",
    },
    {
      id: 2,
      name: "Smartphone",
      description: "Latest Android smartphone",
      price: "Rs 80000",
    },
    {
      id: 3,
      name: "Headphones",
      description: "Noise-cancelling headphones",
      price: "Rs 2200",
    },
    {
      id: 4,
      name: "Smartwatch",
      description: "Feature-packed smartwatch",
      price: "Rs 15000",
    },
  ];

  return products.map((product) => ({
    productid: product.id.toString(),
  }));
}
