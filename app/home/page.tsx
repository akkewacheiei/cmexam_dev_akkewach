"use client";
import React, { useState, useEffect } from "react";
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

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  let timeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);


  const debounceFetchData = () => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fetchData();
    }, 300); // 300 milliseconds debounce delay
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    debounceFetchData();
  };


  useEffect(() => {
    console.log("searchTerm :", searchTerm);
    
  }, [searchTerm]);

  return (
    <div>
      <h1>Home Page</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      {products.map((item: Product) => (
        <div className="flex gap-3 mb-3 items-center border-2" key={item.id}>
          <img src={item.thumbnail} alt="thumbnail" width="30" height="30"></img>
          <p>{item.title}</p>
          <p>{item.price}</p>
          <p>{item.stock}</p>
          <Link href={`/home/${item.id}`}>Detail</Link>
        </div>
      ))}
    </div>
  );
}
