import { queryKeyHomepage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  HomepageHighlightKeywordsListResponse,
  HomepageHighlightKeywordsListResponseSchema,
} from '@apps/packages/services/homepage'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../../../BaseMutation'

type useHomepageHighlightKeywordListConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<HomepageHighlightKeywordsListResponse>
}

export const useHomepageHighlightKeywordList = (opt?: useHomepageHighlightKeywordListConfig) => {
  const { queryKey = [queryKeyHomepage.HIGHLIGHT_KEYWORD_LIST], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: HomepageHighlightKeywordsListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.homepage.getHighlightKeywordsList(),
    refetchOnWindowFocus: false,
    placeholderData,
    enabled: false,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: HomepageHighlightKeywordsListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
