import { queryKeyMitraPackage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  PackageListParams,
  PackageListResponse,
  PackageListResponseSchema,
} from '@apps/packages/services/mitra-package'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type usePackageListConfig = {
  queryKey?: QueryKey
  params?: PackageListParams
  options?: UseQueryOptions<PackageListResponse>
}

export const usePackageList = (opt?: usePackageListConfig) => {
  const {
    queryKey = [queryKeyMitraPackage.MITRA_PACKAGE_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: PackageListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.mitraPackage.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: PackageListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
