import { queryKeyMasterAirlines } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterAirlinesListParams,
  MasterAirlinesListResponse,
  MasterAirlinesListResponseSchema,
} from '@apps/packages/services/master-airlines'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterAirlinesListConfig = {
  queryKey?: QueryKey
  params?: MasterAirlinesListParams
  options?: UseQueryOptions<MasterAirlinesListResponse>
}

export const useMasterAirlinesList = (opt?: useMasterAirlinesListConfig) => {
  const {
    queryKey = [queryKeyMasterAirlines.MASTER_AIRLINES_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterAirlinesListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterAirlines.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterAirlinesListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
