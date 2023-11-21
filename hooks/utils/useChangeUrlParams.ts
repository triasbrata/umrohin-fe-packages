import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

type Params = {
  newParams: { [key: string]: string | number }
  withPrevSearchParams?: boolean
}

export const useChangeUrlParams = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const queryString = useCallback(
    ({ newParams, withPrevSearchParams }: Params) => {
      const params: Params['newParams'] = {}
      if (withPrevSearchParams) {
        searchParams.forEach((value, key) => (params[key] = value))
      }
      Object.assign(params, newParams)
      return Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    },
    [searchParams]
  )

  const changeUrlParams = (params: Params) => {
    router.push(`${pathname}?${queryString(params)}`)
  }

  return { changeUrlParams }
}
