import { queryKeyMasterAirport } from '@apps/split/lib/constants'
import apiServices from '@apps/services'
import { placeholderListBuilder } from '@apps/services/BaseResponse'
import {
  MasterAirportListParams,
  MasterAirportListResponse,
  MasterAirportListResponseSchema,
} from '@apps/split/services/master-airport'
import { apiResponseValidation } from '@apps/split/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterAirportListConfig = {
  queryKey?: QueryKey
  params?: MasterAirportListParams
  options?: UseQueryOptions<MasterAirportListResponse>
}

export const useMasterAirportList = (opt?: useMasterAirportListConfig) => {
  const {
    queryKey = [queryKeyMasterAirport.MASTER_AIRPORT_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterAirportListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterAirport.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterAirportListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
