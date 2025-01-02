import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'
import {
  MasterHotelInternalListParams,
  MasterHotelInternalListResponse,
  MasterHotelInternalListResponseSchema,
} from '@apps/packages/services/master-hotel-internal'
import { queryKeyMasterHotelTransit } from '@apps/packages/lib/constants/queryKeyMasterHotelTransit'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import apiServices from '@apps/packages/services'

type useMasterHotelTransitListConfig = {
  queryKey?: QueryKey
  params?: MasterHotelInternalListParams
  options?: UseQueryOptions<MasterHotelInternalListResponse>
}

export const useMasterHotelTransitList = (opt?: useMasterHotelTransitListConfig) => {
  const {
    queryKey = [queryKeyMasterHotelTransit.MASTER_HOTEL_TRANSIT_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterHotelInternalListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterHotelInternal.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterHotelInternalListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
