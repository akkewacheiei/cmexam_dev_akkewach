"use client"
import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation'


export default function Home() {
  useEffect(() => {
    redirect('/login')
  }, []);

  return (
   <div>
    <h1>Main Page</h1>
   </div>
  );
}
