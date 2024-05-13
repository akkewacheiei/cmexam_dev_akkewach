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
  const [showTotalPrice, setShowTotalPrice] = useState<boolean>(false);
  const [priceFilter, setPriceFilter] = useState<string>("all");

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

  const filterProductsBySearchTerm = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    let filtered = products.filter((product) => {
      // Check if any of the product properties contain the searchTerm
      return Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(lowerCaseSearchTerm)
      );
    });

    // Apply price filter
    if (priceFilter === "up1000") {
      filtered = filtered.filter((product) => product.price > 1000);
    }

    return filtered;
  };

  const filteredProducts = filterProductsBySearchTerm();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    debounceFetchData();
  };

  const handlePriceFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("value :", event.target.value);
    if (event.target.value === "total_price") {
      setShowTotalPrice(true);
    } else {
      setShowTotalPrice(false);
    }

    setPriceFilter(event.target.value);
  };

  useEffect(() => {
    console.log("searchTerm :", searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <h1>Home Page</h1>
      <input
        className="mt-10 mb-10 mr-10"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />

      <label>Choose a filter:</label>
      <select
        name="priceFilter"
        id="priceFilter"
        onChange={handlePriceFilterChange}
      >
        <option value="all">ทั้งหมด</option>
        <option value="up1000">มากกว่า 1000</option>
        <option value="total_price">แสดงราคารวมต่อชิ้น</option>
      </select>

      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Thumbnail</th>
            <th className="border border-gray-400 px-4 py-2">Title</th>
            <th className="border border-gray-400 px-4 py-2">Price</th>
            <th className="border border-gray-400 px-4 py-2">Stock</th>
            {showTotalPrice && (
              <th className="border border-gray-400 px-4 py-2">Total Price</th>
            )}

            <th className="border border-gray-400 px-4 py-2">Detail</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((item: Product) => (
            <tr key={item.id}>
              <td className="border border-gray-400 px-4 py-2">
                <img
                  src={item.thumbnail}
                  alt="thumbnail"
                  width="30"
                  height="30"
                ></img>
              </td>
              <td className="border border-gray-400 px-4 py-2">{item.title}</td>
              <td className="border border-gray-400 px-4 py-2">{item.price}</td>
              <td className="border border-gray-400 px-4 py-2">{item.stock}</td>
              {showTotalPrice && (
                <td className="border border-gray-400 px-4 py-2">
                  {item.price * item.stock}
                </td>
              )}
              <td className="border border-gray-400 px-4 py-2">
                <Link href={`/home/${item.id}`}>Detail</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
