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
        'bg-white border border-gray-200 rounded-xl p-6 shadow-sm',
        {
          'hover:border-purple-300 hover:shadow-md transition-all duration-200 cursor-pointer': hover,
        },
        className
      )}
    >
      {children}
    </div>
  )
}
