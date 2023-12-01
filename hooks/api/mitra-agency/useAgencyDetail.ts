import { queryKeyMitraAgency } from '@apps/packages/lib/constants'
import { MitraAgencyListItem } from '@apps/packages/services/mitra-agency'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMitraAgencyDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MitraAgencyListItem>
}

export const useMitraAgencyDetail = (opt?: useMitraAgencyDetailConfig) => {
  const { queryKey = [queryKeyMitraAgency.MITRA_AGENCY_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MitraAgencyListItem = queryClient.getQueryData(queryKey) ?? {
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

  return useQuery<MitraAgencyListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
