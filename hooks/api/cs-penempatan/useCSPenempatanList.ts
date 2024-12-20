import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'
import {
  CSPenempatanListParams,
  CSPenempatanListResponse,
  CSPenempatanListResponseSchema,
} from '@apps/packages/services/cs-penempatan'
import { queryKeyCSPenempatan } from '@apps/packages/lib/constants/queryKeyCSPenempatan'

type useCSPenempatanListConfig = {
  queryKey?: QueryKey
  params?: CSPenempatanListParams
  options?: UseQueryOptions<CSPenempatanListResponse>
}

export const useCSPenempatanList = (opt?: useCSPenempatanListConfig) => {
  const { queryKey = [queryKeyCSPenempatan.CS_PENEMPATAN_LIST], params = { page: 1, size: 10 }, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CSPenempatanListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.CSPenempatan.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: CSPenempatanListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
