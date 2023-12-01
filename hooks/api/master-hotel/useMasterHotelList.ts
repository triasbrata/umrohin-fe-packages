import { queryKeyMasterHotel } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterHotelListParams,
  MasterHotelListResponse,
  MasterHotelListResponseSchema,
} from '@apps/packages/services/master-hotel'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterHotelListConfig = {
  queryKey?: QueryKey
  params?: MasterHotelListParams
  options?: UseQueryOptions<MasterHotelListResponse>
}

export const useMasterHotelList = (opt?: useMasterHotelListConfig) => {
  const { queryKey = [queryKeyMasterHotel.MASTER_HOTEL_LIST], params = { page: 1, page_size: 10 }, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterHotelListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterHotel.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterHotelListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
