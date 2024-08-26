import { queryKeyMasterPartner } from '@apps/packages/lib/constants'
import { MasterPartnerListItem } from '@apps/packages/services/master-partner'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterPartnerDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterPartnerListItem>
}

export const useMasterPartnerDetail = (opt?: useMasterPartnerDetailConfig) => {
  const { queryKey = [queryKeyMasterPartner.MASTER_PARTNER_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterPartnerListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    name: '',
    director_name: '',
    phone: '',
    sk_number: '',
    sk_year: 0,
    office_status: '',
    office_address: '',
    logo: '',
    banner: '',
    bank_name: '',
    account_name: '',
    account_number: '',
    status: '',
    verification_status: '',
    reason: '',
  }

  return useQuery<MasterPartnerListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    ...options,
  })
}
