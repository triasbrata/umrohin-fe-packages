import { queryKeyMasterLanguage } from '@apps/packages/lib/constants'
import { MasterLanguageListItem } from '@apps/packages/services/master-language'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterLanguageDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterLanguageListItem>
}

export const useMasterLanguageDetail = (opt?: useMasterLanguageDetailConfig) => {
  const { queryKey = [queryKeyMasterLanguage.MASTER_LANGUAGE_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterLanguageListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    code: '',
    name: '',
    short_name: '',
    is_active: '',
  }

  return useQuery<MasterLanguageListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
