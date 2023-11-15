import { queryKeyMasterTourLocation } from '@apps/packages/lib/constants'
import apiServices from '@apps/services'
import { placeholderListBuilder } from '@apps/services/BaseResponse'
import {
  MasterTourLocationListParams,
  MasterTourLocationListResponse,
  MasterTourLocationListResponseSchema,
} from '@apps/packages/services/master-tour-location'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterTourLocationListConfig = {
  queryKey?: QueryKey
  params?: MasterTourLocationListParams
  options?: UseQueryOptions<MasterTourLocationListResponse>
}

export const useMasterTourLocationList = (opt?: useMasterTourLocationListConfig) => {
  const {
    queryKey = [queryKeyMasterTourLocation.MASTER_TOUR_LOCATION_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterTourLocationListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterTourLocation.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterTourLocationListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
