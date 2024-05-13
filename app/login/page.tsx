"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

interface FormData {
  email: string;
  password: string;
}

export default function page(): JSX.Element {
  const [statusLogin, setStatusLogin] = useState<String>("default");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (formData.email === "aa@bb.cc" && formData.password === "1234") {
      console.log("Login Success!!!");
      setStatusLogin("success");

      //useRouter().push("/home");
    } else {
      setStatusLogin("fail");
    }
  };

  useEffect(() => {
    if (statusLogin === "success") {
      redirect("/home");
    }
  }, [statusLogin]);

  return (
    <div className="pt-20 flex flex-col items-center gap-10">
      <h1 className="text-center font-bold text-2xl"> Login</h1>
      <input
        id="email"
        name="email"
        placeholder="Email"
        className="border-2 w-[70%] lg:w-[30%] h-10"
        value={formData.email}
        onChange={handleInput}
      ></input>
      <input
        id="password"
        name="password"
        placeholder="Password"
        className="border-2 w-[70%] lg:w-[30%] h-10"
        value={formData.password}
        onChange={handleInput}
      ></input>
      <button className=" bg-green-300  p-5" onClick={handleSubmit}>
        เข้าสู่ระบบ
      </button>
      {statusLogin === "fail" && (
        <h1 className=" text-red-500">Email or password incorrect</h1>
      )}
    </div>
  );
}
