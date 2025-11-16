import { Link, useLocation } from 'react-router-dom'
import { BarChart3, User, CreditCard } from 'lucide-react'
import logo from '../assets/logo.png'

interface NavigationProps {
  isAuthenticated?: boolean
}

export default function Navigation({ isAuthenticated = false }: NavigationProps) {
  const location = useLocation()

  return (
    <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center">
            <img src={logo} alt="Labely" className="h-12" />
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === '/dashboard'
                    ? 'bg-purple-500/20 text-purple-400 font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <BarChart3 size={20} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/billing-team"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === '/billing-team'
                    ? 'bg-purple-500/20 text-purple-400 font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <CreditCard size={20} />
                <span>Billing & Team</span>
              </Link>
              <div className="ml-2 w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/signin"
                className="text-gray-400 hover:text-white font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Sign in
              </Link>
              <Link to="/signup" className="btn-primary">
                Get started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
