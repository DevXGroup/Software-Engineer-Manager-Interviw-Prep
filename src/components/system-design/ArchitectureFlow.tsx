'use client'

import { useId } from 'react'
import { useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

export type NodeKind = 'client' | 'edge' | 'compute' | 'cache' | 'store' | 'queue' | 'worker'

export interface FlowNode {
  id: string
  label: string
  sub?: string
  kind: NodeKind
  col: number
  row: number
}

export interface FlowEdge {
  from: string
  to: string
  label?: string
  /** Async hop (queue, event). Drawn dashed. */
  async?: boolean
}

export interface FlowDiagram {
  title: string
  nodes: FlowNode[]
  edges: FlowEdge[]
  /** Node ids in order, the request path a packet travels. */
  path: string[]
  /** Optional second path (e.g. the async branch). */
  altPath?: string[]
  caption: string
}

const COL = 176
const ROW = 84
const W = 136
const H = 46
const PAD = 16

const kindClass: Record<NodeKind, string> = {
  client: 'fill-white stroke-ink-400 dark:fill-ink-900 dark:stroke-ink-500',
  edge: 'fill-ink-100 stroke-ink-400 dark:fill-ink-800 dark:stroke-ink-500',
  compute: 'fill-white stroke-ink-700 dark:fill-ink-900 dark:stroke-ink-300',
  worker: 'fill-white stroke-ink-700 dark:fill-ink-900 dark:stroke-ink-300',
  cache: 'fill-teal-50 stroke-teal-600 dark:fill-teal-950 dark:stroke-teal-400',
  store: 'fill-teal-100 stroke-teal-700 dark:fill-teal-900 dark:stroke-teal-300',
  queue: 'fill-amber-50 stroke-amber-600 dark:fill-amber-950 dark:stroke-amber-400',
}

const kindLabel: Record<NodeKind, string> = {
  client: 'Client',
  edge: 'Edge (CDN, LB)',
  compute: 'Stateless service',
  worker: 'Worker',
  cache: 'Cache',
  store: 'Database',
  queue: 'Queue / stream',
}

function center(n: FlowNode) {
  return { x: PAD + n.col * COL + W / 2, y: PAD + n.row * ROW + H / 2 }
}

function edgePath(a: FlowNode, b: FlowNode): string {
  const ca = center(a)
  const cb = center(b)
  if (a.col === b.col) {
    const dir = cb.y > ca.y ? 1 : -1
    return `M ${ca.x} ${ca.y + (dir * H) / 2} L ${cb.x} ${cb.y - (dir * H) / 2}`
  }
  const x1 = a.col < b.col ? ca.x + W / 2 : ca.x - W / 2
  const x2 = a.col < b.col ? cb.x - W / 2 : cb.x + W / 2
  const mx = (x1 + x2) / 2
  return `M ${x1} ${ca.y} C ${mx} ${ca.y}, ${mx} ${cb.y}, ${x2} ${cb.y}`
}

/**
 * Data-driven request-flow diagram. SVG, tokenised, theme-aware.
 * A packet travels the request path hop by hop (offset-path), which is the
 * one thing a static box diagram cannot show: order. Reduced motion: static.
 */
export function ArchitectureFlow({ diagram, className }: { diagram: FlowDiagram; className?: string }) {
  const reduce = useReducedMotion()
  const uid = useId().replace(/:/g, '')
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]))
  const cols = Math.max(...diagram.nodes.map((n) => n.col)) + 1
  const rows = Math.max(...diagram.nodes.map((n) => n.row)) + 1
  const width = PAD * 2 + cols * COL - (COL - W)
  const height = PAD * 2 + rows * ROW - (ROW - H)
  const arrow = `arrow-${uid}`

  const hops = (path: string[]) =>
    path.slice(1).map((id, i) => ({ from: byId[path[i]], to: byId[id], d: edgePath(byId[path[i]], byId[id]) }))

  const mainHops = hops(diagram.path)
  const altHops = diagram.altPath ? hops(diagram.altPath) : []
  const hopMs = 900
  const cycleMs = (mainHops.length + altHops.length + 1) * hopMs

  return (
    <figure className={clsx('surface-sunken overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          style={{ minWidth: Math.min(width, 640), display: 'block' }}
          role="img"
          aria-labelledby={`${uid}-title ${uid}-desc`}
        >
          <title id={`${uid}-title`}>{diagram.title}</title>
          <desc id={`${uid}-desc`}>
            {diagram.caption} Request path: {diagram.path.map((id) => byId[id].label).join(' to ')}.
          </desc>
          <defs>
            <marker id={arrow} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="fill-ink-500 dark:fill-ink-400" />
            </marker>
          </defs>

          {diagram.edges.map((e, i) => (
            <g key={i}>
              <path
                d={edgePath(byId[e.from], byId[e.to])}
                fill="none"
                strokeWidth={1.5}
                strokeDasharray={e.async ? '5 4' : undefined}
                markerEnd={`url(#${arrow})`}
                className="stroke-ink-500 dark:stroke-ink-400"
              />
              {e.label && (
                <text
                  x={(center(byId[e.from]).x + center(byId[e.to]).x) / 2}
                  y={(center(byId[e.from]).y + center(byId[e.to]).y) / 2 - 8}
                  textAnchor="middle"
                  className="fill-ink-600 font-mono text-[10px] dark:fill-ink-300"
                >
                  {e.label}
                </text>
              )}
            </g>
          ))}

          {diagram.nodes.map((n) => {
            const c = center(n)
            return (
              <g key={n.id}>
                <rect
                  x={c.x - W / 2}
                  y={c.y - H / 2}
                  width={W}
                  height={H}
                  rx={8}
                  strokeWidth={1.5}
                  strokeDasharray={n.kind === 'queue' ? '5 4' : undefined}
                  className={kindClass[n.kind]}
                />
                <text
                  x={c.x}
                  y={n.sub ? c.y - 3 : c.y + 4}
                  textAnchor="middle"
                  className="fill-ink-900 text-[12px] font-semibold dark:fill-ink-50"
                >
                  {n.label}
                </text>
                {n.sub && (
                  <text x={c.x} y={c.y + 12} textAnchor="middle" className="fill-ink-600 font-mono text-[10px] dark:fill-ink-300">
                    {n.sub}
                  </text>
                )}
              </g>
            )
          })}

          {!reduce &&
            [...mainHops, ...altHops].map((hop, i) => (
              <circle
                key={i}
                r={5}
                className="fill-clay-600 dark:fill-clay-400"
                style={{
                  offsetPath: `path('${hop.d}')`,
                  offsetRotate: '0deg',
                  animation: `flow-hop-${uid} ${cycleMs}ms linear infinite`,
                  animationDelay: `${i * hopMs}ms`,
                  opacity: 0,
                }}
              />
            ))}
          <style>{`
            @keyframes flow-hop-${uid} {
              0% { offset-distance: 0%; opacity: 0; }
              2% { opacity: 1; }
              ${((hopMs / cycleMs) * 100).toFixed(2)}% { offset-distance: 100%; opacity: 1; }
              ${((hopMs / cycleMs) * 100 + 0.5).toFixed(2)}% { opacity: 0; }
              100% { offset-distance: 100%; opacity: 0; }
            }
          `}</style>
        </svg>
      </div>

      <figcaption className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink-200 px-4 py-3 text-xs text-ink-600 dark:border-ink-800 dark:text-ink-300">
        <span className="mr-auto">{diagram.caption}</span>
        {(['compute', 'cache', 'store', 'queue'] as NodeKind[]).map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5">
            <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
              <rect x="0.75" y="0.75" width="12.5" height="8.5" rx="2" strokeWidth={1.5} strokeDasharray={k === 'queue' ? '3 2' : undefined} className={kindClass[k]} />
            </svg>
            {kindLabel[k]}
          </span>
        ))}
        {!reduce && (
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-clay-600 dark:bg-clay-400" aria-hidden="true" />
            One request
          </span>
        )}
      </figcaption>
    </figure>
  )
}
