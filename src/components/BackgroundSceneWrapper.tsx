'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const DynamicBackgroundScene = dynamic(() => import('./BackgroundScene'), {
  ssr: false,
})

export default function BackgroundSceneWrapper() {
  return (
    <Suspense fallback={<div className="w-full h-full bg-gray-200" />}>
      <DynamicBackgroundScene />
    </Suspense>
  )
}

