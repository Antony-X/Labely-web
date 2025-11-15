import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import {
  ArrowLeft,
  Download,
  Clock,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Activity,
  PlusCircle,
} from 'lucide-react'

// Mock project data
const projectData = {
  id: '1',
  name: 'Product Image Classification',
  status: 'Running',
  createdAt: '2025-11-10T10:00:00',
  launchedAt: '2025-11-10T14:30:00',
  deadline: '2025-11-20',
  totalItems: 10000,
  itemsLabeled: 8450,
  itemsInProgress: 750,
  totalBudget: 3000,
  spent: 845,
  averageQuality: 96.5,
  averageConfidence: 94.2,
  labelsPerItem: 3,
  minElo: 1200,
}

const activityLog = [
  {
    id: '1',
    type: 'launch',
    message: 'Project launched',
    timestamp: '2025-11-10T14:30:00',
  },
  {
    id: '2',
    type: 'milestone',
    message: '1,000 items labeled',
    timestamp: '2025-11-10T18:45:00',
  },
  {
    id: '3',
    type: 'gold',
    message: 'Gold-check set added (100 items)',
    timestamp: '2025-11-11T09:00:00',
  },
  {
    id: '4',
    type: 'milestone',
    message: '5,000 items labeled',
    timestamp: '2025-11-12T15:20:00',
  },
  {
    id: '5',
    type: 'quality',
    message: 'Quality score improved to 96.5%',
    timestamp: '2025-11-13T11:30:00',
  },
  {
    id: '6',
    type: 'budget',
    message: 'Budget topped up: +$1,000',
    timestamp: '2025-11-13T16:00:00',
  },
  {
    id: '7',
    type: 'milestone',
    message: '8,000 items labeled',
    timestamp: '2025-11-14T10:15:00',
  },
]

function getActivityIcon(type: string) {
  switch (type) {
    case 'launch':
      return <Activity className="text-purple-400" size={16} />
    case 'milestone':
      return <TrendingUp className="text-blue-400" size={16} />
    case 'gold':
      return <CheckCircle className="text-yellow-400" size={16} />
    case 'quality':
      return <CheckCircle className="text-green-400" size={16} />
    case 'budget':
      return <DollarSign className="text-pink-400" size={16} />
    default:
      return <Activity className="text-gray-400" size={16} />
  }
}

export default function ProjectDetailPage() {
  const progress = (projectData.itemsLabeled / projectData.totalItems) * 100
  const budgetUsed = (projectData.spent / projectData.totalBudget) * 100

  return (
    <Layout isAuthenticated>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to projects
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{projectData.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <span
                  className={`px-3 py-1 rounded-full font-medium ${
                    projectData.status === 'Running'
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'bg-green-500/10 text-green-400 border border-green-500/20'
                  }`}
                >
                  {projectData.status}
                </span>
                <span className="text-gray-400">
                  Created {new Date(projectData.createdAt).toLocaleDateString()}
                </span>
                <span className="text-gray-400">
                  Deadline {new Date(projectData.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Button>
              <Download size={18} className="mr-2" />
              Download labeled data
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card>
              <h2 className="text-xl font-semibold mb-6">Progress Overview</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Items Labeled</span>
                    <span className="font-semibold">
                      {projectData.itemsLabeled.toLocaleString()} /{' '}
                      {projectData.totalItems.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-3">
                    <div
                      className="bg-gradient-primary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{progress.toFixed(1)}% complete</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Budget Used</span>
                    <span className="font-semibold">
                      ${projectData.spent.toLocaleString()} / $
                      {projectData.totalBudget.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-pink-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${budgetUsed}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{budgetUsed.toFixed(1)}% used</p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">In Progress</p>
                    <p className="text-2xl font-bold">
                      {projectData.itemsInProgress.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Remaining</p>
                    <p className="text-2xl font-bold">
                      {(
                        projectData.totalItems -
                        projectData.itemsLabeled -
                        projectData.itemsInProgress
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Est. Completion</p>
                    <p className="text-lg font-bold">~6h</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quality Metrics */}
            <Card>
              <h2 className="text-xl font-semibold mb-6">Quality Metrics</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Average Quality Score</span>
                    <span className="text-3xl font-bold text-green-400">
                      {projectData.averageQuality}%
                    </span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${projectData.averageQuality}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Average Confidence</span>
                    <span className="text-3xl font-bold text-blue-400">
                      {projectData.averageConfidence}%
                    </span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${projectData.averageConfidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-800">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Labels per Item</p>
                  <p className="text-xl font-semibold">{projectData.labelsPerItem}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Min Labeler ELO</p>
                  <p className="text-xl font-semibold">{projectData.minElo}</p>
                </div>
              </div>
            </Card>

            {/* Top Up Budget */}
            <Card>
              <h2 className="text-xl font-semibold mb-4">Top Up Budget</h2>
              <p className="text-gray-400 text-sm mb-4">
                Add more funds to continue labeling beyond your current budget
              </p>
              <div className="flex gap-4">
                <Input type="number" placeholder="Amount ($)" className="max-w-xs" />
                <Button>
                  <PlusCircle size={18} className="mr-2" />
                  Add funds
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline */}
            <Card>
              <h2 className="text-xl font-semibold mb-4">Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="text-gray-400 flex-shrink-0 mt-1" size={18} />
                  <div>
                    <p className="text-sm font-semibold">Created</p>
                    <p className="text-xs text-gray-400">
                      {new Date(projectData.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="text-purple-400 flex-shrink-0 mt-1" size={18} />
                  <div>
                    <p className="text-sm font-semibold">Launched</p>
                    <p className="text-xs text-gray-400">
                      {new Date(projectData.launchedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-gray-500 flex-shrink-0 mt-1" size={18} />
                  <div>
                    <p className="text-sm font-semibold text-gray-400">Deadline</p>
                    <p className="text-xs text-gray-500">
                      {new Date(projectData.deadline).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Activity Log */}
            <Card>
              <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {activityLog.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-800 last:border-0">
                    <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
