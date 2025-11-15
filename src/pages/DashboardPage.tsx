import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Button from '../components/Button'
import { Plus, Package, DollarSign, Clock, Star } from 'lucide-react'
import { useProjects } from '../contexts/ProjectContext'

function getStatusColor(status: string) {
  switch (status) {
    case 'Running':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    case 'Completed':
      return 'bg-green-500/10 text-green-400 border-green-500/20'
    case 'Draft':
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  }
}

export default function DashboardPage() {
  const { projects } = useProjects()

  // Calculate stats from projects
  const stats = useMemo(() => {
    const totalItemsLabeled = projects.reduce((sum, p) => sum + p.itemsLabeled, 0)
    const totalSpend = projects.reduce((sum, p) => sum + p.spend, 0)
    // Mock average turnaround for now
    const avgTurnaround = 18.5

    return {
      totalItemsLabeled,
      totalSpend,
      avgTurnaround,
    }
  }, [projects])

  return (
    <Layout isAuthenticated>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-gray-400 mt-1">Manage your labeling projects</p>
          </div>
          <Link to="/projects/create">
            <Button>
              <Plus size={20} className="mr-2" />
              New project
            </Button>
          </Link>
        </div>

        {/* Global Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Items Labeled</p>
                <p className="text-3xl font-bold">{stats.totalItemsLabeled.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Package className="text-purple-400" size={24} />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Spend</p>
                <p className="text-3xl font-bold">${stats.totalSpend.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center">
                <DollarSign className="text-pink-400" size={24} />
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Avg Turnaround</p>
                <p className="text-3xl font-bold">{stats.avgTurnaround}h</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Clock className="text-purple-400" size={24} />
              </div>
            </div>
          </Card>
        </div>

        {/* Projects List */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Project</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Progress</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Spend</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Quality</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer"
                  >
                    <td className="py-4 px-4">
                      <Link to={`/projects/${project.id}`} className="hover:text-purple-400">
                        <div className="font-semibold">{project.name}</div>
                      </Link>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-800 rounded-full h-2 max-w-[120px]">
                          <div
                            className="bg-gradient-primary h-2 rounded-full"
                            style={{
                              width: `${(project.itemsLabeled / project.totalItems) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-400">
                          {project.itemsLabeled.toLocaleString()}/{project.totalItems.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">${project.spend.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      {project.qualityScore > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-400" />
                          <span>{project.qualityScore}%</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-gray-400">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
