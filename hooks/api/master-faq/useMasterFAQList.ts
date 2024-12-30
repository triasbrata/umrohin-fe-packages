import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'
import { queryKeyMasterFAQ } from '@apps/packages/lib/constants/queryKeyMasterFAQ'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import apiServices from '@apps/packages/services'
import { FAQListParams, FAQListResponse, FAQListResponseSchema } from '@apps/packages/services/master-faq'

type useMasterFAQListConfig = {
  queryKey?: QueryKey
  params?: FAQListParams
  options?: UseQueryOptions<FAQListResponse>
}

export const useMasterFAQList = (opt?: useMasterFAQListConfig) => {
  const { queryKey = [queryKeyMasterFAQ.MASTER_FAQ_LIST], params = { page: 1, page_size: 10 }, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: FAQListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterFAQ.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: FAQListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
