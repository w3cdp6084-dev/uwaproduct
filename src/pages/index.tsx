// pages/index.tsx
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Home: React.FC = () => {
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

  // ローディング完了後にメインコンテンツを表示
  return (
    <main style={{ padding: '2rem' }}>
      <h1>メインコンテンツ</h1>
      <p>ここにポートフォリオの内容を自由に配置してください。</p>
    </main>
  );
};

export default Home;