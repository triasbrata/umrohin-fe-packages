import { queryKeyMitraAgency } from '@apps/split/lib/constants'
import { AgencyListItem } from '@apps/split/services/mitra-agency'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useCustomerListConfig = {
	queryKey?: QueryKey
	options?: UseQueryOptions<AgencyListItem[]>
}

export const useAgencyList = (opt?: useCustomerListConfig) => {
	const { queryKey = [queryKeyMitraAgency.MITRA_AGENCY_LIST], options } = opt ?? {}
	const queryClient = useQueryClient()
	const placeholderData: AgencyListItem[] = queryClient.getQueryData(queryKey) ?? []

	return useQuery<AgencyListItem[]>({
		queryKey,
		queryFn: () => placeholderData,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		...options,
	})
}
