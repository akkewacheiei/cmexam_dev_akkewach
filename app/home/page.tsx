"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";

async function getData() {
  const api_url = "https://dummyjson.com/products";
  const res = await fetch(api_url);
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  return res.json();
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: number[];
}

interface Products {
  products: number[];
}

export default async function page() {
  const [products, setProducts] = useState<Products>();
  const data = await getData();

/*   useEffect(() => {
    //componentDidMount()
    console.log("componentDidMount()");
  }, []); */


/*   useEffect(() => {
    //componentDidUpdate()
    console.log("componentDidUpdate()");
  }, [somthing]); */

  return (
    <div>
      <h1>Home Page</h1>
      {data.products.map((item: Product) => (
        <div className="flex gap-3 mb-3 items-center border-2">
          <img src={item.thumbnail} alt="tumbnail" width="30" height="30"></img>
          <p>{item.title}</p>
          <p>{item.price}</p>
          <p>{item.stock}</p>
          <Link href={`/home/${item.id}`}>Detail</Link>
        </div>
      ))}
    </div>
  );
}
