import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Button from '../components/Button'
import { Plus, Package, DollarSign, Clock, Star } from 'lucide-react'

// Mock data
const stats = {
  totalItemsLabeled: 125430,
  totalSpend: 8945,
  avgTurnaround: 18.5,
}

const projects = [
  {
    id: '1',
    name: 'Product Image Classification',
    status: 'Running',
    itemsLabeled: 8450,
    totalItems: 10000,
    spend: 845,
    qualityScore: 96.5,
    createdAt: '2025-11-10',
  },
  {
    id: '2',
    name: 'Sentiment Analysis Dataset',
    status: 'Completed',
    itemsLabeled: 50000,
    totalItems: 50000,
    spend: 2500,
    qualityScore: 98.2,
    createdAt: '2025-10-28',
  },
  {
    id: '3',
    name: 'Object Detection - Street Scenes',
    status: 'Running',
    itemsLabeled: 3200,
    totalItems: 15000,
    spend: 1920,
    qualityScore: 94.8,
    createdAt: '2025-11-08',
  },
  {
    id: '4',
    name: 'Medical Image Labeling',
    status: 'Draft',
    itemsLabeled: 0,
    totalItems: 5000,
    spend: 0,
    qualityScore: 0,
    createdAt: '2025-11-14',
  },
  {
    id: '5',
    name: 'Audio Transcription QA',
    status: 'Completed',
    itemsLabeled: 8000,
    totalItems: 8000,
    spend: 3200,
    qualityScore: 97.1,
    createdAt: '2025-10-15',
  },
]

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
