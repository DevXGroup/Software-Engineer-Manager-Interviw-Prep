'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function SystemDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = 400
    
    // Draw system components
    const drawComponent = (x: number, y: number, width: number, height: number, label: string, color: string) => {
      ctx.fillStyle = color
      ctx.fillRect(x, y, width, height)
      ctx.strokeStyle = '#333'
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, width, height)
      
      ctx.fillStyle = '#fff'
      ctx.font = '14px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(label, x + width / 2, y + height / 2 + 5)
    }
    
    const drawConnection = (x1: number, y1: number, x2: number, y2: number) => {
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = '#666'
      ctx.lineWidth = 2
      ctx.stroke()
      
      // Arrow
      const angle = Math.atan2(y2 - y1, x2 - x1)
      ctx.beginPath()
      ctx.moveTo(x2, y2)
      ctx.lineTo(x2 - 10 * Math.cos(angle - Math.PI / 6), y2 - 10 * Math.sin(angle - Math.PI / 6))
      ctx.lineTo(x2 - 10 * Math.cos(angle + Math.PI / 6), y2 - 10 * Math.sin(angle + Math.PI / 6))
      ctx.closePath()
      ctx.fillStyle = '#666'
      ctx.fill()
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw components
    drawComponent(50, 50, 120, 60, 'Client', '#4F46E5')
    drawComponent(50, 150, 120, 60, 'CDN', '#10B981')
    drawComponent(250, 100, 120, 60, 'Load Balancer', '#F59E0B')
    drawComponent(450, 50, 120, 60, 'Server 1', '#3B82F6')
    drawComponent(450, 150, 120, 60, 'Server 2', '#3B82F6')
    drawComponent(450, 250, 120, 60, 'Server 3', '#3B82F6')
    drawComponent(650, 100, 120, 60, 'Database', '#8B5CF6')
    drawComponent(650, 200, 120, 60, 'Cache', '#EC4899')
    
    // Draw connections
    drawConnection(170, 80, 250, 130)
    drawConnection(170, 180, 250, 130)
    drawConnection(370, 130, 450, 80)
    drawConnection(370, 130, 450, 180)
    drawConnection(370, 130, 450, 280)
    drawConnection(570, 80, 650, 130)
    drawConnection(570, 180, 650, 130)
    drawConnection(570, 180, 650, 230)
  }, [])
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800"
    >
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg bg-gray-50 dark:bg-gray-900"
      />
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-blue-600"></div>
          <span className="text-gray-600 dark:text-gray-400">Application Layer</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-green-500"></div>
          <span className="text-gray-600 dark:text-gray-400">CDN/Cache</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-yellow-500"></div>
          <span className="text-gray-600 dark:text-gray-400">Load Balancer</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-purple-600"></div>
          <span className="text-gray-600 dark:text-gray-400">Data Layer</span>
        </div>
      </div>
    </motion.div>
  )
}