import { ReactNode } from 'react'
import Navigation from './Navigation'

interface LayoutProps {
  children: ReactNode
  isAuthenticated?: boolean
}

export default function Layout({ children, isAuthenticated = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation isAuthenticated={isAuthenticated} />
      <main>{children}</main>
    </div>
  )
}
