import { queryKeyMasterBanners } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'
import { BannerListParams, BannerListResponse, BannerListResponseSchema } from '@apps/packages/services/master-banner'

type useMasterBannerListConfig = {
  queryKey?: QueryKey
  params?: BannerListParams
  options?: UseQueryOptions<BannerListResponse>
}

export const useMasterBannerList = (opt?: useMasterBannerListConfig) => {
  const {
    queryKey = [queryKeyMasterBanners.MASTER_BANNER_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: BannerListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterBanner.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: BannerListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
