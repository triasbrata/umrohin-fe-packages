import { queryKeyMasterBank } from '@apps/packages/lib/constants'
import { MasterBankListItem } from '@apps/packages/services/master-bank'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterBankDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterBankListItem>
}

export const useMasterBankDetail = (opt?: useMasterBankDetailConfig) => {
  const { queryKey = [queryKeyMasterBank.MASTER_BANK_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterBankListItem = queryClient.getQueryData(queryKey) ?? {
    bank_id: '',
    name: '',
    code: '',
  }

  return useQuery<MasterBankListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
