import { queryKeyMasterLanguage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterLanguageListParams,
  MasterLanguageListResponse,
  MasterLanguageListResponseSchema,
} from '@apps/packages/services/master-language'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterLanguageListConfig = {
  queryKey?: QueryKey
  params?: MasterLanguageListParams
  options?: UseQueryOptions<MasterLanguageListResponse>
}

export const useMasterLanguageList = (opt?: useMasterLanguageListConfig) => {
  const {
    queryKey = [queryKeyMasterLanguage.MASTER_LANGUAGE_LIST],
    params = { page: 1, size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterLanguageListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterLanguage.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterLanguageListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
