"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { redirect } from "next/navigation";
import * as Yup from 'yup';


interface FormData {
  email: string;
  password: string;
}
// Schema สำหรับตรวจสอบฟอร์แมตของอีเมล
const emailSchema = Yup.string().email('รูปแบบอีเมลไม่ถูกต้อง').required('กรุณากรอกอีเมล');

// Schema สำหรับตรวจสอบความยาวของรหัสผ่าน
const passwordSchema = Yup.string().min(4, 'รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร').required('กรุณากรอกรหัสผ่าน');

// นำ schema มารวมกันใน schema ที่เป็น Object
const loginSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema
});

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

  const handleSubmit = async () => {
    try {
      await loginSchema.validate(formData, { abortEarly: false });
      if (formData.email === "aa@bb.cc" && formData.password === "1234") {
        console.log("Login Success!!!");
        setStatusLogin("success");
      } else {
        setStatusLogin("fail");
      }
    } catch (error) {
      // จัดรูปแบบข้อผิดพลาดจาก Yup เพื่อแสดงให้ผู้ใช้เห็น
      const errorMessage = error.inner.map((e: any) => e.message).join("\n");
      console.error(errorMessage);
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