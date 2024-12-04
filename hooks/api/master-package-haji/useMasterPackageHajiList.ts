import { queryKeyMasterPackageHaji } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterPackageHajiListParams,
  MasterPackageHajiListResponse,
  MasterPackageHajiListResponseSchema,
} from '@apps/packages/services/master-package-haji'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterPackageHajiListConfig = {
  queryKey?: QueryKey
  params?: MasterPackageHajiListParams
  options?: UseQueryOptions<MasterPackageHajiListResponse>
}

export const useMasterPackageHajiList = (opt?: useMasterPackageHajiListConfig) => {
  const {
    queryKey = [queryKeyMasterPackageHaji.MASTER_PACKAGE_HAJI_LIST],
    params = { page: 1, size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterPackageHajiListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterPackageHaji.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterPackageHajiListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
