import { queryKeyHomepage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  HomepageHighlightTourDestinationsListResponse,
  HomepageHighlightTourDestinationsListResponseSchema,
} from '@apps/packages/services/homepage/highlight/tour-destinations'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useQueryList } from '../../../BaseMutation'

type useHomepageHighlightTourDestinationsListConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<HomepageHighlightTourDestinationsListResponse>
}

export const useHomepageHighlightTourDestinationsList = (opt?: useHomepageHighlightTourDestinationsListConfig) => {
  const { queryKey = [queryKeyHomepage.HIGHLIGHT_TOUR_DESTINATIONS], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: HomepageHighlightTourDestinationsListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.homepage.getHighlightTourDestinationsList(),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: HomepageHighlightTourDestinationsListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
