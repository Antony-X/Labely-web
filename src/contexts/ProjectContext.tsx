import { createContext, useContext, useState, ReactNode } from 'react'

export interface Project {
  id: string
  name: string
  status: 'Draft' | 'Running' | 'Completed'
  itemsLabeled: number
  totalItems: number
  spend: number
  qualityScore: number
  createdAt: string
  description?: string
  useCase?: string
  taskType?: string
  labelClasses?: string[]
  totalBudget?: number
  perItemReward?: number
  deadline?: string
  labelsPerItem?: number
  minElo?: number
  goldCheckFrequency?: number
}

interface ProjectContextType {
  projects: Project[]
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

// Initial mock projects
const initialProjects: Project[] = [
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

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)

  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev])
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) => (project.id === id ? { ...project, ...updates } : project))
    )
  }

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id))
  }

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}
