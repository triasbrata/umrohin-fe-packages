import { queryKeyHomepage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  HomepageHighlightKeywordListResponse,
  HomepageHighlightKeywordListResponseSchema,
} from '@apps/packages/services/homepage'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../../../BaseMutation'

type useHomepageHighlightKeywordListConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<HomepageHighlightKeywordListResponse>
}

export const useHomepageHighlightKeywordList = (opt?: useHomepageHighlightKeywordListConfig) => {
  const { queryKey = [queryKeyHomepage.HIGHLIGHT_KEYWORD_LIST], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: HomepageHighlightKeywordListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.homepage.getHighlightKeywordList(),
    refetchOnWindowFocus: false,
    placeholderData,
    enabled: false,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: HomepageHighlightKeywordListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
