import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'
import {
  BenefitListParams,
  BenefitListResponse,
  BenefitListResponseSchema,
} from '@apps/packages/services/master-benefit'
import { queryKeyMasterBenefit } from '@apps/packages/lib/constants/queryKeyMasterBenefit'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import apiServices from '@apps/packages/services'

type useMasterBenefitListConfig = {
  queryKey?: QueryKey
  params?: BenefitListParams
  options?: UseQueryOptions<BenefitListResponse>
}

export const useMasterBenefitList = (opt?: useMasterBenefitListConfig) => {
  const {
    queryKey = [queryKeyMasterBenefit.MASTER_BENEFIT_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: BenefitListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterBenefit.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: BenefitListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
