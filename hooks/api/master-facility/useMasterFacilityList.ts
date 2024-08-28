import { queryKeyMasterFacility } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterFacilityListParams,
  MasterFacilityListResponse,
  MasterFacilityListResponseSchema,
} from '@apps/packages/services/master-facility'
import { apiResponseValidation } from '@apps/packages/utils'
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
    params = { page: 1, page_size: 10, export_data: false },
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
