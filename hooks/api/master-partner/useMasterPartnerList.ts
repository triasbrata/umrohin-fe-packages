import { queryKeyMasterPartner } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterPartnerListParams,
  MasterPartnerListResponse,
  MasterPartnerListResponseSchema,
} from '@apps/packages/services/master-partner'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterPartnerListConfig = {
  queryKey?: QueryKey
  params?: MasterPartnerListParams
  options?: UseQueryOptions<MasterPartnerListResponse>
}

export const useMasterPartnerList = (opt?: useMasterPartnerListConfig) => {
  const {
    queryKey = [queryKeyMasterPartner.MASTER_PARTNER_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterPartnerListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterPartner.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterPartnerListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
