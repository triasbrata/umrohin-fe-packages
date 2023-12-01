import { queryKeyHomepage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  HomepageHighlightAirlinesListResponse,
  HomepageHighlightAirlinesListResponseSchema,
} from '@apps/packages/services/homepage/highlight/airlines'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../../../BaseMutation'

type useHomepageHighlightAirlinesListConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<HomepageHighlightAirlinesListResponse>
}

export const useHomepageHighlightAirlinesList = (opt?: useHomepageHighlightAirlinesListConfig) => {
  const { queryKey = [queryKeyHomepage.HIGHLIGHT_AIRLINES], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: HomepageHighlightAirlinesListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.homepage.getHighlightAirlinesList(),
    refetchOnWindowFocus: false,
    placeholderData,
    enabled: false,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: HomepageHighlightAirlinesListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
