import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: 180, height: 180, background: '#a5592e', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12, padding: '0 40px' }}>
        <div style={{ height: 22, width: 100, borderRadius: 8, background: '#fff' }} />
        <div style={{ height: 22, width: 68, borderRadius: 8, background: '#fff', opacity: 0.85 }} />
        <div style={{ height: 22, width: 34, borderRadius: 8, background: '#fff', opacity: 0.7 }} />
      </div>
    ),
    size
  )
}
