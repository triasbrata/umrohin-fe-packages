import { queryKeyHomepage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  HomepageHighlightPackagesListParams,
  HomepageHighlightPackagesListResponse,
  HomepageHighlightPackagesListResponseSchema,
} from '@apps/packages/services/homepage/highlight/list-packages'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../../../BaseMutation'

type useHomepageHighlightPackagesListConfig = {
  queryKey?: QueryKey
  params: HomepageHighlightPackagesListParams
  options?: UseQueryOptions<HomepageHighlightPackagesListResponse>
}

export const useHomepageHighlightPackagesList = (opt?: useHomepageHighlightPackagesListConfig) => {
  const { queryKey = [queryKeyHomepage.HIGHLIGHT_PACKAGES], params = {}, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: HomepageHighlightPackagesListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.homepage.getHighlightPackagesList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: HomepageHighlightPackagesListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
