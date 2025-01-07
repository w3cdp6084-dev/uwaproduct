import MorphingParticleScene from '@/components/morphing-particles'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <MorphingParticleScene />
      <div className="relative z-10 p-8 text-white">
        <h1 className="text-6xl font-bold tracking-tighter mb-8">
          PARTICLE<br />
          MORPHING<br />
          ANIMATION
        </h1>
        <nav className="fixed top-8 right-8 space-y-4">
          <a href="#about" className="block text-lg hover:opacity-70">ABOUT</a>
          <a href="#company" className="block text-lg hover:opacity-70">COMPANY</a>
          <a href="#works" className="block text-lg hover:opacity-70">WORKS</a>
          <a href="#news" className="block text-lg hover:opacity-70">NEWS</a>
        </nav>
      </div>
    </main>
  )
}

