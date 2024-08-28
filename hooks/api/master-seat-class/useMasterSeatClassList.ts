import { queryKeyMasterSeatClass } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterSeatClassListParams,
  MasterSeatClassListResponse,
  MasterSeatClassListResponseSchema,
} from '@apps/packages/services/master-seat-class'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterSeatClassListConfig = {
  queryKey?: QueryKey
  params?: MasterSeatClassListParams
  options?: UseQueryOptions<MasterSeatClassListResponse>
}

export const useMasterSeatClassList = (opt?: useMasterSeatClassListConfig) => {
  const {
    queryKey = [queryKeyMasterSeatClass.MASTER_SEAT_CLASS_LIST],
    params = { page: 1, size: 10, export_data: false },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterSeatClassListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterSeatClass.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterSeatClassListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
