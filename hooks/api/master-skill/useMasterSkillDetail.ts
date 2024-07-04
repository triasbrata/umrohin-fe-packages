import { queryKeyMasterSkill } from '@apps/packages/lib/constants'
import { MasterSkillListItem } from '@apps/packages/services/master-skill'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterSkillDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterSkillListItem>
}

export const useMasterSkillDetail = (opt?: useMasterSkillDetailConfig) => {
  const { queryKey = [queryKeyMasterSkill.MASTER_SKILL_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterSkillListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    name: '',
    is_active: '',
  }

  return useQuery<MasterSkillListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
