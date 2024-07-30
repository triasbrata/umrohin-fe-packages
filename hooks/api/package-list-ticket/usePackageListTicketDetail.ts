import { queryKeyPackageListTicket } from '@apps/packages/lib/constants'
import { PackageListTicketListItem } from '@apps/packages/services/package-list-ticket'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type usePackageListTicketDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<PackageListTicketListItem>
}

export const usePackageListTicketDetail = (opt?: usePackageListTicketDetailConfig) => {
  const { queryKey = [queryKeyPackageListTicket.PACKAGE_LIST_TICKET_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: PackageListTicketListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    provider_id: '',
    flight_id: '',
    no: '',
    status: '',
    is_active: true,
  }

  return useQuery<PackageListTicketListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    ...options,
  })
}
