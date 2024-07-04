import { queryKeyMasterTourLeader } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterTourLeaderListParams,
  MasterTourLeaderListResponse,
  MasterTourLeaderListResponseSchema,
} from '@apps/packages/services/master-tour-leader'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterTourLeaderListConfig = {
  queryKey?: QueryKey
  params?: MasterTourLeaderListParams
  options?: UseQueryOptions<MasterTourLeaderListResponse>
}

export const useMasterTourLeaderList = (opt?: useMasterTourLeaderListConfig) => {
  const {
    queryKey = [queryKeyMasterTourLeader.MASTER_TOUR_LEADER_LIST],
    params = { page: 0, size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterTourLeaderListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterTourLeader.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterTourLeaderListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
