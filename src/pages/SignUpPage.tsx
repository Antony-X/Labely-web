import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Input from '../components/Input'
import Select from '../components/Select'
import Button from '../components/Button'
import Card from '../components/Card'

export default function SignUpPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    teamSize: '1-10',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock registration - just navigate to dashboard
    navigate('/dashboard')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Create your account</h1>
            <p className="text-gray-400">Start labeling data in minutes</p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="companyName"
                label="Company name"
                placeholder="Acme Inc."
                value={formData.companyName}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                label="Work email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Select
                name="teamSize"
                label="Team size"
                value={formData.teamSize}
                onChange={handleChange}
                options={[
                  { value: '1-10', label: '1-10 employees' },
                  { value: '11-50', label: '11-50 employees' },
                  { value: '51-200', label: '51-200 employees' },
                  { value: '201-500', label: '201-500 employees' },
                  { value: '500+', label: '500+ employees' },
                ]}
              />
              <div className="text-xs text-gray-500">
                By signing up, you agree to our{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </a>
              </div>
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/signin" className="text-purple-400 hover:text-purple-300 font-semibold">
                Sign in
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
