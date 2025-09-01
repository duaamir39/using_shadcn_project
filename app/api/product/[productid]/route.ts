import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { productid: string } }) {
  const { productid } = params;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${productid}`);
    if (!res.ok) throw new Error(`Failed to fetch product (status ${res.status})`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("API fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
