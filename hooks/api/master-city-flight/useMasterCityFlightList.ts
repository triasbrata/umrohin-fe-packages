import { queryKeyMasterCityFlight } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterCityFlightListParams,
  MasterCityFlightListResponse,
  MasterCityFlightListResponseSchema,
} from '@apps/packages/services/master-city-flight'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterCityFlightListConfig = {
  queryKey?: QueryKey
  params?: MasterCityFlightListParams
  options?: UseQueryOptions<MasterCityFlightListResponse>
}

export const useMasterCityFlightList = (opt?: useMasterCityFlightListConfig) => {
  const {
    queryKey = [queryKeyMasterCityFlight.MASTER_CITY_FLIGHT_LIST],
    params = { page: 1, size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterCityFlightListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterCityFlight.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterCityFlightListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
