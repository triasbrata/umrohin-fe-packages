import { queryKeyMasterProvider } from '@apps/packages/lib/constants'
import { MasterProviderListItem } from '@apps/packages/services/master-provider'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterProviderDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterProviderListItem>
}

export const useMasterProviderDetail = (opt?: useMasterProviderDetailConfig) => {
  const { queryKey = [queryKeyMasterProvider.MASTER_PROVIDER_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterProviderListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    name: '',
    pic_name: '',
    pic_phone: '',
    address: '',
    type: '',
  }

  return useQuery<MasterProviderListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    ...options,
  })
}
