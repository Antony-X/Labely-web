import { Link, useLocation } from 'react-router-dom'
import { BarChart3, User, CreditCard } from 'lucide-react'

interface NavigationProps {
  isAuthenticated?: boolean
}

export default function Navigation({ isAuthenticated = false }: NavigationProps) {
  const location = useLocation()

  return (
    <nav className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
            <span className="text-2xl font-bold gradient-text">Labely</span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-6">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === '/dashboard'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <BarChart3 size={18} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/billing-team"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === '/billing-team'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <CreditCard size={18} />
                <span>Billing & Team</span>
              </Link>
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <User size={18} />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/signin" className="text-gray-300 hover:text-white transition-colors">
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
