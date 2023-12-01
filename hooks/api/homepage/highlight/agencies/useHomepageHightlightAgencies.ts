import { queryKeyHomepage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  HomepageHighlightAgenciesListResponse,
  HomepageHighlightAgenciesListResponseSchema,
} from '@apps/packages/services/homepage/highlight/agencies'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../../../BaseMutation'

type useHomepageHighlightAgenciesListConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<HomepageHighlightAgenciesListResponse>
}

export const useHomepageHighlightAgenciesList = (opt?: useHomepageHighlightAgenciesListConfig) => {
  const { queryKey = [queryKeyHomepage.HIGHAGE], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: HomepageHighlightAgenciesListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.homepage.getHighlightAgenciesList(),
    refetchOnWindowFocus: false,
    placeholderData,
    enabled: false,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: HomepageHighlightAgenciesListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
