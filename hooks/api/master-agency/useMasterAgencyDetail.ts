import { queryKeyMasterAgency } from '@apps/packages/lib/constants'
import { MasterAgencyListItem } from '@apps/packages/services/master-agency'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterAgencyDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterAgencyListItem>
}

export const useMasterAgencyDetail = (opt?: useMasterAgencyDetailConfig) => {
  const { queryKey = [queryKeyMasterAgency.MASTER_AGENCY_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterAgencyListItem = queryClient.getQueryData(queryKey) ?? {
    agency_id: '',
    name: '',
    director_name: '',
    business_phone_number: '',
    business_certificate_number: '',
    business_certificate_year: 0,
    address: '',
    is_hq: false,
    is_highlight: false,
    bank_id: 0,
    bank_number: '',
    bank_owner_name: '',
    thumbnail: '',
    image: '',
    reject_reason: null,
    verification_status: -1,
    status: 0,
  }

  return useQuery<MasterAgencyListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
