import { queryKeyHomepage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  HomepageHighlightMetaPackagesListResponse,
  HomepageHighlightMetaPackagesListResponseSchema,
} from '@apps/packages/services/homepage/highlight/meta-packages'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../../../BaseMutation'

type useHomepageHighlightMetaPackagesListConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<HomepageHighlightMetaPackagesListResponse>
}

export const useHomepageHighlightMetaPackagesList = (opt?: useHomepageHighlightMetaPackagesListConfig) => {
  const { queryKey = [queryKeyHomepage.HIGHLIGHT_META_PACKAGES], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: HomepageHighlightMetaPackagesListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.homepage.getHighlightMetaPackagesList(),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: HomepageHighlightMetaPackagesListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
