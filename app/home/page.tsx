"use client"
import React from "react";

async function getData() {
  const api_url = "https://dummyjson.com/products";
  const res = await fetch(api_url);
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  return res.json();
}


export default function Home() {
  return (
   <div>
    <h1>Home Page</h1>
   </div>
  );
}
