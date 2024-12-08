// app/ClientWrapper.tsx
"use client"

import dynamic from 'next/dynamic'

const BackgroundScene = dynamic(() => import('@/components/BackgroundScene'), { ssr: false })

export default function ClientWrapper() {
  return (
    <>
      <BackgroundScene />
      <div style={{position:'relative', zIndex:1}}>
        <h1 style={{color:'white'}}>My Portfolio</h1>
        <p style={{color:'white'}}>Welcome to my creative space.</p>
      </div>
    </>
  )
}