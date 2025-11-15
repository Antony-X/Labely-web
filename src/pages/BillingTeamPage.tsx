import { useState } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'
import { Download, CreditCard, Users, Plus, Trash2 } from 'lucide-react'

// Mock data
const invoices = [
  {
    id: 'INV-001',
    date: '2025-11-01',
    amount: 2500,
    status: 'Paid',
    description: 'Labeling services - October 2025',
  },
  {
    id: 'INV-002',
    date: '2025-10-01',
    amount: 1850,
    status: 'Paid',
    description: 'Labeling services - September 2025',
  },
  {
    id: 'INV-003',
    date: '2025-09-01',
    amount: 3200,
    status: 'Paid',
    description: 'Labeling services - August 2025',
  },
]

const teamMembers = [
  {
    id: '1',
    name: 'Nikoloz Gegenava',
    email: 'nicolasgegenava@gmail.com',
    role: 'Owner',
    joinedAt: '2025-08-15',
  },
  {
    id: '2',
    name: 'Nikoloz Kipshidze',
    email: 'kipshidze.nick@gmail.com',
    role: 'Editor',
    joinedAt: '2025-09-01',
  },
  {
    id: '3',
    name: 'Antoni Ingorokva',
    email: 'ingorokva.antoni@gmail.com',
    role: 'Editor',
    joinedAt: '2025-10-10',
  },
  {
    id: '4',
    name: 'Giorgi Kavelashvili',
    email: 'gkavelashvili2@gmail.com',
    role: 'Editor',
    joinedAt: '2025-11-01',
  },
  {
    id: '5',
    name: 'Gigi Molashkhia',
    email: 'molashkhiagigi@gmail.com',
    role: 'Viewer',
    joinedAt: '2025-11-05',
  },
]

export default function BillingTeamPage() {
  const [activeTab, setActiveTab] = useState<'billing' | 'team'>('billing')
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('viewer')

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Invitation sent to ${inviteEmail}`)
    setInviteEmail('')
    setShowInviteForm(false)
  }

  const totalSpend = invoices.reduce((sum, inv) => sum + inv.amount, 0)

  return (
    <Layout isAuthenticated>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Billing & Team</h1>
          <p className="text-gray-400 mt-1">Manage your billing and team members</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-800 mb-8">
          <button
            onClick={() => setActiveTab('billing')}
            className={`pb-4 px-2 font-semibold transition-colors relative ${
              activeTab === 'billing' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <CreditCard size={18} className="inline mr-2" />
            Billing
            {activeTab === 'billing' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`pb-4 px-2 font-semibold transition-colors relative ${
              activeTab === 'team' ? 'text-white' : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Users size={18} className="inline mr-2" />
            Team
            {activeTab === 'team' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary"></div>
            )}
          </button>
        </div>

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            {/* Spend Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <p className="text-gray-400 text-sm mb-1">Total Spend (All Time)</p>
                <p className="text-3xl font-bold">${totalSpend.toLocaleString()}</p>
              </Card>
              <Card>
                <p className="text-gray-400 text-sm mb-1">This Month</p>
                <p className="text-3xl font-bold">${invoices[0]?.amount.toLocaleString() || 0}</p>
              </Card>
              <Card>
                <p className="text-gray-400 text-sm mb-1">Payment Method</p>
                <div className="flex items-center gap-2 mt-2">
                  <CreditCard className="text-gray-400" size={20} />
                  <span className="text-sm">•••• 4242</span>
                </div>
                <Button variant="ghost" size="sm" className="mt-2 text-purple-400">
                  Update
                </Button>
              </Card>
            </div>

            {/* Invoices */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Invoices</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">
                        Invoice ID
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">
                        Description
                      </th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-gray-800">
                        <td className="py-4 px-4 font-mono text-sm">{invoice.id}</td>
                        <td className="py-4 px-4 text-gray-400">
                          {new Date(invoice.date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">{invoice.description}</td>
                        <td className="py-4 px-4 font-semibold">
                          ${invoice.amount.toLocaleString()}
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                            <Download size={14} />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Spending History Chart */}
            <Card>
              <h2 className="text-xl font-semibold mb-6">Spending History</h2>
              <div className="h-64 flex items-end justify-center gap-8 px-4">
                {[...invoices].reverse().map((invoice) => {
                  const maxAmount = Math.max(...invoices.map((i) => i.amount))
                  const heightPercent = (invoice.amount / maxAmount) * 100

                  return (
                    <div key={invoice.id} className="flex flex-col items-center gap-2">
                      <div className="flex flex-col items-center justify-end h-48">
                        <div
                          className="w-16 bg-gradient-primary rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                          style={{
                            height: `${heightPercent}%`,
                            minHeight: '20px',
                          }}
                          title={`$${invoice.amount}`}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(invoice.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-sm font-semibold">${invoice.amount.toLocaleString()}</div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            {/* Team Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <p className="text-gray-400 text-sm mb-1">Total Members</p>
                <p className="text-3xl font-bold">{teamMembers.length}</p>
              </Card>
              <Card>
                <p className="text-gray-400 text-sm mb-1">Owners</p>
                <p className="text-3xl font-bold">
                  {teamMembers.filter((m) => m.role === 'Owner').length}
                </p>
              </Card>
              <Card>
                <p className="text-gray-400 text-sm mb-1">Editors</p>
                <p className="text-3xl font-bold">
                  {teamMembers.filter((m) => m.role === 'Editor').length}
                </p>
              </Card>
            </div>

            {/* Team Members */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Team Members</h2>
                <Button onClick={() => setShowInviteForm(!showInviteForm)}>
                  <Plus size={18} className="mr-2" />
                  Invite member
                </Button>
              </div>

              {/* Invite Form */}
              {showInviteForm && (
                <form onSubmit={handleInvite} className="mb-6 p-4 bg-gray-800/50 rounded-lg">
                  <h3 className="font-semibold mb-4">Invite team member</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      type="email"
                      placeholder="colleague@company.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                    />
                    <Select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      options={[
                        { value: 'viewer', label: 'Viewer - Can view projects' },
                        { value: 'editor', label: 'Editor - Can create and edit projects' },
                        { value: 'owner', label: 'Owner - Full access' },
                      ]}
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button type="submit">Send invitation</Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setShowInviteForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}

              {/* Members List */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Joined</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-b border-gray-800">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center font-semibold">
                              {member.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                            <span className="font-semibold">{member.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-400">{member.email}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              member.role === 'Owner'
                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                : member.role === 'Editor'
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                            }`}
                          >
                            {member.role}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-400">
                          {new Date(member.joinedAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          {member.role !== 'Owner' && (
                            <button className="text-red-400 hover:text-red-300">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Role Descriptions */}
            <Card className="bg-gray-800/50">
              <h3 className="font-semibold mb-4">Role Permissions</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-purple-400">Owner:</span>
                  <span className="text-gray-400 ml-2">
                    Full access to all projects, billing, and team management
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-blue-400">Editor:</span>
                  <span className="text-gray-400 ml-2">
                    Can create, edit, and delete projects. Cannot manage billing or team
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-400">Viewer:</span>
                  <span className="text-gray-400 ml-2">
                    Read-only access to view projects and their progress
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  )
}
