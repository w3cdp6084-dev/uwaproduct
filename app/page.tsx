"use client";
import FixedMenu from '../src/components/Menu';
import Footer from '../src/components/Footer';
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../src/components/LoadingSpinner';
import './globals.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // ここではサンプルとして3秒後にローディングを外す例
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <main className="relative min-h-screen">
      <FixedMenu />
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold mb-4">ようこそ</h1>
        <p className="text-xl">
          これは動的な背景を持つページです。背景はクライアントサイドでレンダリングされます。
        </p>
      </div>
      <Footer />
    </main>
  )
}

