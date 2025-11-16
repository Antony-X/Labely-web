import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'
import { CheckCircle, Upload, X } from 'lucide-react'
import { useProjects, Project } from '../contexts/ProjectContext'

type Step = 1 | 2 | 3 | 4 | 5 | 6

interface ProjectData {
  // Step 1
  name: string
  description: string
  useCase: string
  // Step 2
  taskType: string
  labelClasses: string[]
  // Step 3
  files: File[]
  itemCount: number
  modelFile: File | null
  // Step 4
  totalBudget: number
  perItemReward: number
  deadline: string
  // Step 5
  labelsPerItem: number
  minElo: number
  goldCheckFrequency: number
}

export default function ProjectCreatePage() {
  const navigate = useNavigate()
  const { addProject } = useProjects()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [newClass, setNewClass] = useState('')
  const [projectData, setProjectData] = useState<ProjectData>({
    name: '',
    description: '',
    useCase: 'image-classification',
    taskType: 'multi-class',
    labelClasses: [],
    files: [],
    itemCount: 0,
    modelFile: null,
    totalBudget: 1000,
    perItemReward: 0.1,
    deadline: '',
    labelsPerItem: 3,
    minElo: 1200,
    goldCheckFrequency: 10,
  })

  const steps = [
    'Project Basics',
    'Task Type',
    'Upload Data',
    'Budget & Pricing',
    'Quality Settings',
    'Review & Launch',
  ]

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep((currentStep + 1) as Step)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  const handleLaunch = () => {
    // Create new project
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectData.name,
      status: 'Draft',
      itemsLabeled: 0,
      totalItems: projectData.itemCount,
      spend: 0,
      qualityScore: 0,
      createdAt: new Date().toISOString().split('T')[0],
      description: projectData.description,
      useCase: projectData.useCase,
      taskType: projectData.taskType,
      labelClasses: projectData.labelClasses,
      totalBudget: projectData.totalBudget,
      perItemReward: projectData.perItemReward,
      deadline: projectData.deadline,
      labelsPerItem: projectData.labelsPerItem,
      minElo: projectData.minElo,
      goldCheckFrequency: projectData.goldCheckFrequency,
      modelFile: projectData.modelFile,
      modelName: projectData.modelFile?.name,
    }

    addProject(newProject)
    navigate('/dashboard')
  }

  const addClass = () => {
    if (newClass && !projectData.labelClasses.includes(newClass)) {
      setProjectData({
        ...projectData,
        labelClasses: [...projectData.labelClasses, newClass],
      })
      setNewClass('')
    }
  }

  const removeClass = (classToRemove: string) => {
    setProjectData({
      ...projectData,
      labelClasses: projectData.labelClasses.filter((c) => c !== classToRemove),
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProjectData({
        ...projectData,
        files: Array.from(e.target.files),
      })
    }
  }

  const handleModelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProjectData({
        ...projectData,
        modelFile: e.target.files[0],
      })
    }
  }

  return (
    <Layout isAuthenticated>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Project</h1>
          <p className="text-gray-400 mt-1">Configure your labeling project</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      index + 1 < currentStep
                        ? 'bg-gradient-primary text-white'
                        : index + 1 === currentStep
                        ? 'bg-purple-500/20 text-purple-400 border-2 border-purple-500'
                        : 'bg-gray-800 text-gray-500'
                    }`}
                  >
                    {index + 1 < currentStep ? <CheckCircle size={20} /> : index + 1}
                  </div>
                  <span
                    className={`text-xs mt-2 ${
                      index + 1 === currentStep ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      index + 1 < currentStep ? 'bg-gradient-primary' : 'bg-gray-800'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="min-h-[400px]">
          {/* Step 1: Project Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Project Basics</h2>
              <Input
                label="Project name"
                placeholder="e.g., Product Image Classification"
                value={projectData.name}
                onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px]"
                  placeholder="Describe what you're trying to label and why..."
                  value={projectData.description}
                  onChange={(e) =>
                    setProjectData({ ...projectData, description: e.target.value })
                  }
                />
              </div>
              <Select
                label="Use case"
                value={projectData.useCase}
                onChange={(e) => setProjectData({ ...projectData, useCase: e.target.value })}
                options={[
                  { value: 'image-classification', label: 'Image Classification' },
                  { value: 'text-classification', label: 'Text Classification' },
                  { value: 'object-detection', label: 'Object Detection' },
                  { value: 'sentiment-analysis', label: 'Sentiment Analysis' },
                  { value: 'transcription', label: 'Audio Transcription' },
                  { value: 'other', label: 'Other' },
                ]}
              />
            </div>
          )}

          {/* Step 2: Task Type */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Task Type & Labels</h2>
              <Select
                label="Task type"
                value={projectData.taskType}
                onChange={(e) => setProjectData({ ...projectData, taskType: e.target.value })}
                options={[
                  { value: 'binary', label: 'Binary (Yes/No)' },
                  { value: 'multi-class', label: 'Multi-class (Choose one)' },
                  { value: 'multi-label', label: 'Multi-label (Choose multiple)' },
                  { value: 'object-detection', label: 'Object Detection (Bounding boxes)' },
                ]}
              />

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Label Classes
                </label>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Enter a label class"
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addClass())}
                  />
                  <Button onClick={addClass} type="button">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {projectData.labelClasses.map((labelClass) => (
                    <div
                      key={labelClass}
                      className="bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-2 flex items-center gap-2"
                    >
                      <span>{labelClass}</span>
                      <button
                        onClick={() => removeClass(labelClass)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                {projectData.labelClasses.length === 0 && (
                  <p className="text-sm text-gray-500 mt-2">No label classes added yet</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Upload Data */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Upload Data & Model</h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Data files
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center hover:border-purple-500/50 transition-colors">
                  <Upload className="mx-auto mb-4 text-gray-500" size={48} />
                  <p className="text-gray-400 mb-2">
                    Drag and drop your files here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Supports CSV, JSON, images, audio files
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <span className="btn-secondary inline-block cursor-pointer">
                      Choose files
                    </span>
                  </label>
                </div>
                {projectData.files.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">
                      {projectData.files.length} file(s) selected
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Model file (optional)
                </label>
                <p className="text-xs text-gray-400 mb-3">
                  Upload your trained model to track accuracy and performance metrics
                </p>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors">
                  <Upload className="mx-auto mb-3 text-gray-500" size={32} />
                  <p className="text-gray-400 mb-2 text-sm">
                    Upload model file (.h5, .pt, .pkl, .onnx)
                  </p>
                  <input
                    type="file"
                    accept=".h5,.pt,.pkl,.onnx,.pth,.pb"
                    onChange={handleModelUpload}
                    className="hidden"
                    id="model-upload"
                  />
                  <label htmlFor="model-upload">
                    <span className="btn-secondary inline-block cursor-pointer text-sm px-4 py-2">
                      Choose model
                    </span>
                  </label>
                </div>
                {projectData.modelFile && (
                  <div className="mt-3 bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                    <p className="text-sm text-purple-400">
                      ✓ {projectData.modelFile.name} ({(projectData.modelFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                )}
              </div>

              <Input
                type="number"
                label="Approximate number of items to label"
                placeholder="10000"
                value={projectData.itemCount || ''}
                onChange={(e) =>
                  setProjectData({ ...projectData, itemCount: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          )}

          {/* Step 4: Budget & Pricing */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Budget & Pricing</h2>
              <Input
                type="number"
                label="Total budget ($)"
                placeholder="1000"
                value={projectData.totalBudget}
                onChange={(e) =>
                  setProjectData({ ...projectData, totalBudget: parseFloat(e.target.value) || 0 })
                }
              />
              <Input
                type="number"
                step="0.01"
                label="Per-item reward ($)"
                placeholder="0.10"
                value={projectData.perItemReward}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    perItemReward: parseFloat(e.target.value) || 0,
                  })
                }
              />
              <Input
                type="date"
                label="Deadline"
                value={projectData.deadline}
                onChange={(e) => setProjectData({ ...projectData, deadline: e.target.value })}
              />
              <Card className="bg-gray-800/50 border-purple-500/20">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated items:</span>
                    <span className="font-semibold">
                      {Math.floor(
                        projectData.totalBudget /
                          (projectData.perItemReward * projectData.labelsPerItem || 1)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cost per item:</span>
                    <span className="font-semibold">
                      ${(projectData.perItemReward * projectData.labelsPerItem).toFixed(2)}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Step 5: Quality Settings */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Quality Settings</h2>
              <Input
                type="number"
                label="Labels per item"
                placeholder="3"
                value={projectData.labelsPerItem}
                onChange={(e) =>
                  setProjectData({ ...projectData, labelsPerItem: parseInt(e.target.value) || 1 })
                }
                min={1}
                max={10}
              />
              <p className="text-sm text-gray-500 -mt-4">
                More labels per item increases accuracy but costs more
              </p>
              <Input
                type="number"
                label="Minimum labeler ELO rating"
                placeholder="1200"
                value={projectData.minElo}
                onChange={(e) =>
                  setProjectData({ ...projectData, minElo: parseInt(e.target.value) || 0 })
                }
              />
              <p className="text-sm text-gray-500 -mt-4">
                Higher ELO ratings ensure more experienced labelers (range: 800-2000)
              </p>
              <Input
                type="number"
                label="Gold-check frequency (%)"
                placeholder="10"
                value={projectData.goldCheckFrequency}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    goldCheckFrequency: parseInt(e.target.value) || 0,
                  })
                }
                min={0}
                max={100}
              />
              <p className="text-sm text-gray-500 -mt-4">
                Percentage of items that will be pre-labeled gold-standard checks
              </p>
            </div>
          )}

          {/* Step 6: Review & Launch */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Review & Launch</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Project Name</p>
                    <p className="font-semibold">{projectData.name || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Task Type</p>
                    <p className="font-semibold capitalize">{projectData.taskType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Label Classes</p>
                    <p className="font-semibold">{projectData.labelClasses.join(', ') || 'None'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Estimated Items</p>
                    <p className="font-semibold">{projectData.itemCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Budget</p>
                    <p className="font-semibold">${projectData.totalBudget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Per-Item Reward</p>
                    <p className="font-semibold">${projectData.perItemReward}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Labels per Item</p>
                    <p className="font-semibold">{projectData.labelsPerItem}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Min Labeler ELO</p>
                    <p className="font-semibold">{projectData.minElo}</p>
                  </div>
                </div>
                <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20">
                  <p className="text-sm text-gray-300">
                    By launching this project, you authorize Labely to charge your account up to{' '}
                    <span className="font-bold text-white">${projectData.totalBudget}</span> for
                    labeling services. You can pause or cancel the project at any time.
                  </p>
                </Card>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button variant="secondary" onClick={handleBack} disabled={currentStep === 1}>
            Back
          </Button>
          {currentStep < 6 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleLaunch}>Launch Project</Button>
          )}
        </div>
      </div>
    </Layout>
  )
}
