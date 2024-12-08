import BackgroundSceneWrapper from 'src/components/BackgroundSceneWrapper'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <BackgroundSceneWrapper />
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold mb-4">ようこそ</h1>
        <p className="text-xl">
          これは動的な背景を持つページです。背景はクライアントサイドでレンダリングされます。
        </p>
      </div>
    </main>
  )
}

