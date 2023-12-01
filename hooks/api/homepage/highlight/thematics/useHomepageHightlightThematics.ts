import { queryKeyHomepage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  HomepageHighlightThematicsListResponse,
  HomepageHighlightThematicsListResponseSchema,
} from '@apps/packages/services/homepage/highlight/thematics'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../../../BaseMutation'

type useHomepageHighlightThematicsListConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<HomepageHighlightThematicsListResponse>
}

export const useHomepageHighlightThematicsList = (opt?: useHomepageHighlightThematicsListConfig) => {
  const { queryKey = [queryKeyHomepage.HIGHLIGHT_KEYWORD_LIST], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: HomepageHighlightThematicsListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.homepage.getHighlightThematicsList(),
    refetchOnWindowFocus: false,
    placeholderData,
    enabled: false,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: HomepageHighlightThematicsListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
