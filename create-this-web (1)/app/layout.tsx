import type { Metadata } from 'next'
import { Big_Shoulders_Stencil } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const bigShoulders = Big_Shoulders_Stencil({ 
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: 'Sweet Lab - Digital Menu',
  description: 'Discover our delicious sweets, puddings, juices, and food items',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" className="bg-background">
      <body className={`${bigShoulders.className} antialiased bg-background`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
