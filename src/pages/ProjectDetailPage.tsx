import { Link, useParams, Navigate } from 'react-router-dom'
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
import { useProjects } from '../contexts/ProjectContext'

// Mock activity log - in future this will come from backend
const getActivityLog = () => [
  {
    id: '1',
    type: 'launch',
    message: 'Project created',
    timestamp: new Date().toISOString(),
  },
]

function getActivityIcon(type: string) {
  switch (type) {
    case 'launch':
      return <Activity className="text-purple-500" size={16} />
    case 'milestone':
      return <TrendingUp className="text-blue-500" size={16} />
    case 'gold':
      return <CheckCircle className="text-yellow-500" size={16} />
    case 'quality':
      return <CheckCircle className="text-green-500" size={16} />
    case 'budget':
      return <DollarSign className="text-pink-500" size={16} />
    default:
      return <Activity className="text-gray-500" size={16} />
  }
}

export default function ProjectDetailPage() {
  const { id } = useParams()
  const { projects } = useProjects()

  // Find the project
  const project = projects.find((p) => p.id === id)

  // If project not found, redirect to dashboard
  if (!project) {
    return <Navigate to="/dashboard" replace />
  }

  const progress = project.totalItems > 0 ? (project.itemsLabeled / project.totalItems) * 100 : 0
  const budgetUsed = project.totalBudget && project.totalBudget > 0 ? (project.spend / project.totalBudget) * 100 : 0
  const itemsInProgress = Math.floor(project.totalItems * 0.075) // Mock: 7.5% in progress
  const activityLog = getActivityLog()

  return (
    <Layout isAuthenticated>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-gray-400 hover:text-white mb-4 font-medium"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to projects
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <span
                  className={`px-3 py-1 rounded-full font-medium border ${
                    project.status === 'Running'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : project.status === 'Completed'
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                  }`}
                >
                  {project.status}
                </span>
                <span className="text-gray-400">
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </span>
                {project.deadline && (
                  <span className="text-gray-400">
                    Deadline {new Date(project.deadline).toLocaleDateString()}
                  </span>
                )}
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
                      {project.itemsLabeled.toLocaleString()} /{' '}
                      {project.totalItems.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{progress.toFixed(1)}% complete</p>
                </div>

                {project.totalBudget && project.totalBudget > 0 && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Budget Used</span>
                      <span className="font-semibold">
                        ${project.spend.toLocaleString()} / $
                        {project.totalBudget.toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-gray-800 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-pink-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${budgetUsed}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{budgetUsed.toFixed(1)}% used</p>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">In Progress</p>
                    <p className="text-2xl font-bold">
                      {itemsInProgress.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Remaining</p>
                    <p className="text-2xl font-bold">
                      {(project.totalItems - project.itemsLabeled - itemsInProgress).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Est. Completion</p>
                    <p className="text-lg font-bold">
                      {project.status === 'Completed' ? 'Done' : '~6h'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Model Metrics */}
            {project.modelMetrics && project.modelMetrics.length > 0 && (
              <Card>
                <h2 className="text-xl font-semibold mb-6">Model Performance</h2>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Model: {project.modelName}</span>
                    <span className="text-2xl font-bold text-purple-400">
                      {project.currentAccuracy}% Accuracy
                    </span>
                  </div>
                </div>

                {/* Metrics Chart */}
                <div className="relative h-64 mb-6">
                  <div className="absolute inset-0 flex items-end justify-between px-2">
                    {project.modelMetrics.map((metric, idx) => {
                      const maxValue = 100
                      const accuracyHeight = (metric.accuracy / maxValue) * 100

                      return (
                        <div key={idx} className="flex-1 flex items-end justify-center gap-1 px-1">
                          <div className="flex flex-col items-center group relative">
                            <div
                              className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t transition-all hover:from-purple-500 hover:to-purple-300"
                              style={{ height: `${accuracyHeight}%`, minHeight: '4px', minWidth: '40px' }}
                            ></div>
                            <span className="text-xs text-gray-400 mt-1">E{metric.epoch}</span>
                            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 border border-gray-700 text-white text-xs rounded px-3 py-2 whitespace-nowrap z-10">
                              <div className="font-semibold mb-1">Epoch {metric.epoch}</div>
                              <div>Accuracy: {metric.accuracy}%</div>
                              <div>Precision: {metric.precision}%</div>
                              <div>Recall: {metric.recall}%</div>
                              <div>F1 Score: {metric.f1Score}%</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Accuracy</p>
                    <p className="text-lg font-bold text-purple-400">
                      {project.modelMetrics[project.modelMetrics.length - 1].accuracy}%
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Precision</p>
                    <p className="text-lg font-bold text-blue-400">
                      {project.modelMetrics[project.modelMetrics.length - 1].precision}%
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Recall</p>
                    <p className="text-lg font-bold text-green-400">
                      {project.modelMetrics[project.modelMetrics.length - 1].recall}%
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">F1 Score</p>
                    <p className="text-lg font-bold text-pink-400">
                      {project.modelMetrics[project.modelMetrics.length - 1].f1Score}%
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Quality Metrics */}
            {project.qualityScore > 0 && (
              <Card>
                <h2 className="text-xl font-semibold mb-6">Quality Metrics</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Average Quality Score</span>
                      <span className="text-3xl font-bold text-green-400">
                        {project.qualityScore}%
                      </span>
                    </div>
                    <div className="bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${project.qualityScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Average Confidence</span>
                      <span className="text-3xl font-bold text-blue-400">94.2%</span>
                    </div>
                    <div className="bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: '94.2%' }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-800">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Labels per Item</p>
                    <p className="text-xl font-semibold">
                      {project.labelsPerItem || 3}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Min Labeler ELO</p>
                    <p className="text-xl font-semibold">{project.minElo || 1200}</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Top Up Budget */}
            {project.status !== 'Completed' && project.totalBudget && (
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
            )}
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
                      {new Date(project.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                {project.status !== 'Draft' && (
                  <div className="flex items-start gap-3">
                    <Activity className="text-purple-400 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm font-semibold">Launched</p>
                      <p className="text-xs text-gray-400">
                        {new Date(project.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
                {project.deadline && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-gray-400 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm font-semibold">Deadline</p>
                      <p className="text-xs text-gray-400">
                        {new Date(project.deadline).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Activity Log */}
            <Card>
              <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {activityLog.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 pb-3 border-b border-gray-800 last:border-0"
                  >
                    <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-gray-400">
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
