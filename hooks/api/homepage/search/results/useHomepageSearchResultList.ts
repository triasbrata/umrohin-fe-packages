import { queryKeyHomepage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  HomepageSearchResultListParams,
  HomepageSearchResultListResponse,
  HomepageSearchResultListResponseSchema,
} from '@apps/packages/services/homepage'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../../../BaseMutation'

type useHomepageSearchResultListConfig = {
  queryKey?: QueryKey
  params: HomepageSearchResultListParams
  options?: UseQueryOptions<HomepageSearchResultListResponse>
}

export const useHomepageSearchResultList = (opt: useHomepageSearchResultListConfig) => {
  const { queryKey = [queryKeyHomepage.SEARCH_RESULT_LIST], params, options } = opt
  const queryClient = useQueryClient()
  const placeholderData: HomepageSearchResultListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.homepage.getSearchResultList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: HomepageSearchResultListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
