import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
};

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

export default function ProductsPage() {
  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="p-6 border rounded-xl shadow-md hover:shadow-lg transition bg-white"
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            {product.name}
          </h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="mt-4 text-lg font-bold text-green-600">
            {product.price}
          </p>
          <Link
            href={`/products/${product.id}`}
            className="mt-4 inline-block text-blue-600 hover:underline font-medium"
          >
            View Details →
          </Link>
        </div>
      ))}
    </div>
  );
}
export function generateStaticParams() {
  return products.map((product) => ({
    productid: product.id.toString(),
  }));
}
