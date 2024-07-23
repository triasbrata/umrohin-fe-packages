import { queryKeyMasterProvider } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterProviderListParams,
  MasterProviderListResponse,
  MasterProviderListResponseSchema,
} from '@apps/packages/services/master-provider'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterProviderListConfig = {
  queryKey?: QueryKey
  params?: MasterProviderListParams
  options?: UseQueryOptions<MasterProviderListResponse>
}

export const useMasterProviderList = (opt?: useMasterProviderListConfig) => {
  const {
    queryKey = [queryKeyMasterProvider.MASTER_PROVIDER_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterProviderListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterProvider.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterProviderListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
