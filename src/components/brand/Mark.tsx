import type { SVGProps } from 'react'

/**
 * The brand mark: a clay tile carrying the coverage chart from the home page,
 * three ranked bars. No gradients, no text, so it renders identically at 16px
 * and 512px and in every favicon format.
 */
export function Mark({ size = 34, ...rest }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <rect width="32" height="32" rx="8" fill="#a5592e" />
      <rect x="7" y="8" width="18" height="4" rx="1.5" fill="#fff" />
      <rect x="7" y="14" width="12" height="4" rx="1.5" fill="#fff" fillOpacity="0.85" />
      <rect x="7" y="20" width="6" height="4" rx="1.5" fill="#fff" fillOpacity="0.7" />
    </svg>
  )
}
