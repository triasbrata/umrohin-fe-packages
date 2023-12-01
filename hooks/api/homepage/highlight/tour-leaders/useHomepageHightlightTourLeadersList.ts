import { queryKeyHomepage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  HomepageHighlightTourLeadersListResponse,
  HomepageHighlightTourLeadersListResponseSchema,
} from '@apps/packages/services/homepage/highlight/tour-leaders'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../../../BaseMutation'

type useHomepageHighlightTourLeadersListConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<HomepageHighlightTourLeadersListResponse>
}

export const useHomepageHighlightTourLeadersList = (opt?: useHomepageHighlightTourLeadersListConfig) => {
  const { queryKey = [queryKeyHomepage.HIGHLIGHT_TOUR_LEADERS], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: HomepageHighlightTourLeadersListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.homepage.getHighlightTourLeadersList(),
    refetchOnWindowFocus: false,
    placeholderData,
    enabled: false,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: HomepageHighlightTourLeadersListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
