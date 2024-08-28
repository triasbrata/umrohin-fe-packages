import { queryKeyMasterFlightRoute } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterFlightRouteListParams,
  MasterFlightRouteListResponse,
  MasterFlightRouteListResponseSchema,
} from '@apps/packages/services/master-flight-route'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterFlightRouteListConfig = {
  queryKey?: QueryKey
  params?: MasterFlightRouteListParams
  options?: UseQueryOptions<MasterFlightRouteListResponse>
}

export const useMasterFlightRouteList = (opt?: useMasterFlightRouteListConfig) => {
  const {
    queryKey = [queryKeyMasterFlightRoute.MASTER_FLIGHT_ROUTE_LIST],
    params = { page: 1, page_size: 10, export_data: false },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterFlightRouteListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterFlightRoute.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterFlightRouteListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
