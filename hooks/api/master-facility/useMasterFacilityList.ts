import { queryKeyMasterFacility } from '@apps/split/lib/constants'
import apiServices from '@apps/services'
import { placeholderListBuilder } from '@apps/services/BaseResponse'
import {
  MasterFacilityListParams,
  MasterFacilityListResponse,
  MasterFacilityListResponseSchema,
} from '@apps/split/services/master-facility'
import { apiResponseValidation } from '@apps/split/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterFacilityListConfig = {
  queryKey?: QueryKey
  params?: MasterFacilityListParams
  options?: UseQueryOptions<MasterFacilityListResponse>
}

export const useMasterFacilityList = (opt?: useMasterFacilityListConfig) => {
  const {
    queryKey = [queryKeyMasterFacility.MASTER_FACILITY_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterFacilityListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterFacility.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterFacilityListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
