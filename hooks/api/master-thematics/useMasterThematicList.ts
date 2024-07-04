import { queryKeyMasterThematics } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  ThematicListParams,
  ThematicListResponse,
  ThematicListResponseSchema,
} from '@apps/packages/services/master-thematics'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterThematicListConfig = {
  queryKey?: QueryKey
  params?: ThematicListParams
  options?: UseQueryOptions<ThematicListResponse>
}

export const useMasterThematicList = (opt?: useMasterThematicListConfig) => {
  const {
    queryKey = [queryKeyMasterThematics.MASTER_THEMATIC_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: ThematicListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterThematic.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: ThematicListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
