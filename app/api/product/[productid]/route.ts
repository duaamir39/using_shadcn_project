// app/api/product/[productid]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { productid: string } }
) {
  const { productid } = context.params;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${productid}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
