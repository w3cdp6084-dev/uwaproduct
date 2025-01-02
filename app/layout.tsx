import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ポートフォリオ2024',
  description: 'My portfolio for 2024',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="noise-background">
        {children}
      </body>
    </html>
  )
}

