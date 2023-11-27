import { queryKeyMasterAgency } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterAgencyListParams,
  MasterAgencyListResponse,
  MasterAgencyListResponseSchema,
} from '@apps/packages/services/master-agency'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterAgencyListConfig = {
  queryKey?: QueryKey
  params?: MasterAgencyListParams
  options?: UseQueryOptions<MasterAgencyListResponse>
}

export const useMasterAgencyList = (opt?: useMasterAgencyListConfig) => {
  const {
    queryKey = [queryKeyMasterAgency.MASTER_AGENCY_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterAgencyListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterAgency.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterAgencyListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
