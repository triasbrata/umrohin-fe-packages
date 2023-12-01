import { queryKeyMasterBank } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterBankListParams,
  MasterBankListResponse,
  MasterBankListResponseSchema,
} from '@apps/packages/services/master-bank'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterBankListConfig = {
  queryKey?: QueryKey
  params?: MasterBankListParams
  options?: UseQueryOptions<MasterBankListResponse>
}

export const useMasterBankList = (opt?: useMasterBankListConfig) => {
  const { queryKey = [queryKeyMasterBank.MASTER_BANK_LIST], params = { page: 1, page_size: 10 }, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterBankListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterBank.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterBankListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
