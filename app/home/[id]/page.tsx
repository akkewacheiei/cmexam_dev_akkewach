import React from "react";
import Link from "next/link";

interface myParams {
  params: {
    id: string;
  };
}

async function getData(id: string): Promise<any> {
  const api_url = `https://dummyjson.com/products/${id}`;
  const res = await fetch(api_url);
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }
  return res.json();
}

export default async function page({ params }: myParams) {
  const data = await getData(params.id);
  console.log("data :", data);

  return (
    <div>
      Detail Page
      <div>Product ID : {params.id}</div>
      <div className="flex gap-3 mb-3 items-center border-2">
        <img src={data.thumbnail} alt="tumbnail" width="150" height="150"></img>
        <p>{data.title}</p>
        <p>{data.price}</p>
        <p>{data.stock}</p>
      </div>
      <h1>Product Detail: {data.description}</h1>

      <Link href={`/home`}>{"< Back"}</Link>
    </div>
  );
}
