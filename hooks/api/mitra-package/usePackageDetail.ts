import { queryKeyMitraPackage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderDetailBuilder } from '@apps/packages/services/BaseResponse'
import {
  PackageDetailParams,
  PackageDetailResponse,
  PackageDetailResponseSchema,
} from '@apps/packages/services/mitra-package'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'

import { useQueryList } from '../BaseMutation'
import { useAuthRefreshToken } from '../auth'

type usePackageDetailConfig = {
  queryKey?: QueryKey
  params?: PackageDetailParams
  options?: UseQueryOptions<PackageDetailResponse>
  enabled: boolean
}

export const usePackageDetail = (opt?: usePackageDetailConfig) => {
  const { queryKey = [queryKeyMitraPackage.MITRA_PACKAGE_DETAIL], params = { id: 0 }, options, enabled } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: PackageDetailResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderDetailBuilder(),
    []
  )
  const refreshToken = useAuthRefreshToken()
  const query = useQuery({
    queryKey,
    queryFn: () => apiServices.mitraPackage.getDetail({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return response
    },
    enabled: params.id !== 0 && enabled,
    ...options,
  })
  const { data: response } = query
  const { code } = response?.meta ?? {}

  useEffect(() => {
    if (code !== 401) return
    refreshToken().then(() => query.refetch())
  }, [code])
  return query
}
