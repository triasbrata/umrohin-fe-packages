import { queryKeyMasterFigure } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterFigureListParams,
  MasterFigureListResponse,
  MasterFigureListResponseSchema,
} from '@apps/packages/services/master-figure'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterFigureListConfig = {
  queryKey?: QueryKey
  params?: MasterFigureListParams
  options?: UseQueryOptions<MasterFigureListResponse>
}

export const useMasterFigureList = (opt?: useMasterFigureListConfig) => {
  const { queryKey = [queryKeyMasterFigure.MASTER_FIGURE_LIST], params = { page: 0, size: 10 }, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterFigureListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterFigure.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterFigureListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
