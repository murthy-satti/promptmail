'use client'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'light'
    document.documentElement.setAttribute('data-theme', stored)
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme')
    const next = current === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  if (!mounted) return null // avoids hydration mismatch

  return (
    <section className="p-6 rounded-lg border bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2">
            <Sun className="w-5 h-5 text-yellow-500 dark:hidden" />
            <Moon className="w-5 h-5 text-white hidden dark:inline" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">Theme</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Switch between light and dark mode
            </p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="relative w-12 h-6 rounded-full transition-colors duration-200 bg-gray-300 dark:bg-blue-600"
        >
          <div
            className="absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform duration-200 translate-x-0.5 dark:translate-x-6"
          />
        </button>

      </div>
    </section>

  )
}
