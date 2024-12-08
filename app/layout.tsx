import { Righteous } from 'next/font/google'
import './globals.css'

const righteous = Righteous({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Color Screensaver',
  description: 'A dynamic color changing screensaver',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={righteous.className}>
      <body>{children}</body>
    </html>
  )
}

