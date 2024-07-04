import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type Params = {
  page: number
  pageSize: number
  withPrevSearchParams?: boolean
}

// TODO: Deprecated, use useChangeUrlParams instead
export const usePaginationChange = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const queryString = useCallback(
    ({ page, pageSize: page_size, withPrevSearchParams }: Params) => {
      const params: { [key: string]: any } = {}
      if (withPrevSearchParams) {
        searchParams.forEach((value, key) => (params[key] = value))
      }
      Object.assign(params, { page, page_size })
      return Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    },
    [searchParams]
  )

  const onPaginationChange = (params: Params) => {
    router.push(`${pathname}?${queryString(params)}`)
  }

  return { onPaginationChange }
}
