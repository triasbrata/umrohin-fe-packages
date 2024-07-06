import { queryKeyMasterHotelInternal } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterHotelInternalListParams,
  MasterHotelInternalListResponse,
  MasterHotelInternalListResponseSchema,
} from '@apps/packages/services/master-hotel-internal'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterHotelInternalListConfig = {
  queryKey?: QueryKey
  params?: MasterHotelInternalListParams
  options?: UseQueryOptions<MasterHotelInternalListResponse>
}

export const useMasterHotelInternalList = (opt?: useMasterHotelInternalListConfig) => {
  const {
    queryKey = [queryKeyMasterHotelInternal.MASTER_HOTEL_INTERNAL_LIST],
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
