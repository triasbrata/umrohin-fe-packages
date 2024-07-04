import { queryKeyMasterPackage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterPackageListParams,
  MasterPackageListResponse,
  MasterPackageListResponseSchema,
} from '@apps/packages/services/master-package'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterPackageListConfig = {
  queryKey?: QueryKey
  params?: MasterPackageListParams
  options?: UseQueryOptions<MasterPackageListResponse>
}

export const useMasterPackageList = (opt?: useMasterPackageListConfig) => {
  const { queryKey = [queryKeyMasterPackage.MASTER_PACKAGE_LIST], params = { page: 0, size: 10 }, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterPackageListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterPackage.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterPackageListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
