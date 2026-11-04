import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nurse Ability Care | Empowering care, enabling life',
  description: 'Person-centred nursing and NDIS support services built around your goals, choices and independence.',
  generator: 'v0.app',
  icons: {
    icon: '/Favicon.png',
    apple: '/Favicon.png',
  },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#713B78' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-AU"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap" rel="stylesheet" /></head><body>{children}</body></html>
}
