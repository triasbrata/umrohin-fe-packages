import { queryKeyMasterThematics } from '@apps/split/lib/constants'
import apiServices from '@apps/services'
import { placeholderListBuilder } from '@apps/services/BaseResponse'
import {
  DummyThematicListItem,
  ThematicListParams,
  ThematicListResponse,
  ThematicListResponseSchema,
} from '@apps/split/services/master-thematics'
import { apiResponseValidation } from '@apps/split/utils'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useDummyMasterThematicListConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<DummyThematicListItem[]>
}

export const useDummyMasterThematicList = (opt?: useDummyMasterThematicListConfig) => {
  const { queryKey = [queryKeyMasterThematics.DUMMY_MASTER_THEMATIC_LIST], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: DummyThematicListItem[] = queryClient.getQueryData(queryKey) ?? []

  return useQuery<DummyThematicListItem[]>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}

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
