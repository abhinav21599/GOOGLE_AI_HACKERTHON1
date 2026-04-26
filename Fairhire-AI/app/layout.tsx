import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { AnalysisProvider } from '@/lib/analysis-context'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: 'FairHire AI — Intelligent Hiring Bias Auditor',
  description: 'Detect bias in hiring decisions. Analyze fairness across multiple attributes. Get AI-generated explanations and insights.',
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f14' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AnalysisProvider>
          {children}
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'oklch(0.16 0.018 265)',
                border: '1px solid oklch(0.25 0.02 265)',
                color: 'oklch(0.95 0.005 260)',
              },
            }}
          />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </AnalysisProvider>
      </body>
    </html>
  )
}
