import { queryKeyMitraAgency } from '@apps/packages/lib/constants'
import { AgencyListItem } from '@apps/packages/services/mitra-agency'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useCustomerDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<AgencyListItem>
}

export const useAgencyDetail = (opt?: useCustomerDetailConfig) => {
  const { queryKey = [queryKeyMitraAgency.MITRA_AGENCY_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: AgencyListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    name: '',
    director_name: '',
    address: '',
    bank_code: '',
    bank_number: '',
    bank_owner_name: '',
    certificate_number: 0,
    certificate_year: 0,
    is_highlight: false,
    logo_url: '',
    banner_url: '',
    office_status: '',
    phone: '',
    reject_reason: '',
    status: 0,
    verification_status: 0,
  }

  return useQuery<AgencyListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
