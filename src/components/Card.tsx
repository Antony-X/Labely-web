import { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-gray-900 border border-gray-800 rounded-lg p-6',
        {
          'hover:border-purple-500/50 transition-all duration-200 cursor-pointer': hover,
        },
        className
      )}
    >
      {children}
    </div>
  )
}
