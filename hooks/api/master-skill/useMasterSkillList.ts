import { queryKeyMasterSkill } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterSkillListParams,
  MasterSkillListResponse,
  MasterSkillListResponseSchema,
} from '@apps/packages/services/master-skill'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterSkillListConfig = {
  queryKey?: QueryKey
  params?: MasterSkillListParams
  options?: UseQueryOptions<MasterSkillListResponse>
}

export const useMasterSkillList = (opt?: useMasterSkillListConfig) => {
  const { queryKey = [queryKeyMasterSkill.MASTER_SKILL_LIST], params = { page: 1, size: 10 }, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterSkillListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterSkill.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterSkillListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
