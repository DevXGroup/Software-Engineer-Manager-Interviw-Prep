'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export type SearchParamsLike = {
  get: (name: string) => string | null
}

function SearchParamSyncInner({ onChange }: { onChange: (searchParams: SearchParamsLike) => void }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    onChange(searchParams)
  }, [onChange, searchParams])

  return null
}

export function SearchParamSync({ onChange }: { onChange: (searchParams: SearchParamsLike) => void }) {
  return (
    <Suspense fallback={null}>
      <SearchParamSyncInner onChange={onChange} />
    </Suspense>
  )
}
