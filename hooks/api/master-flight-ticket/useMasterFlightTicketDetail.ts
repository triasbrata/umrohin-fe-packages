import { queryKeyMasterFlightTicket } from '@apps/packages/lib/constants'
import { MasterFlightTicketListItem } from '@apps/packages/services/master-flight-ticket'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useMasterFlightTicketDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<MasterFlightTicketListItem>
}

export const useMasterFlightTicketDetail = (opt?: useMasterFlightTicketDetailConfig) => {
  const { queryKey = [queryKeyMasterFlightTicket.MASTER_FLIGHT_TICKET_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterFlightTicketListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    rute_id: '',
    airline_id: '',
    provider_id: '',
    departure_date: '',
    arrived_date: '',
    departure_time: '',
    arrived_time: '',
    class_id: '',
    price: '',
    discount_percentage: '',
    discount_price: '',
    final_price: '',
    is_transit: true,
    flight_code: '',
    ticket_no: '',
  }

  return useQuery<MasterFlightTicketListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    ...options,
  })
}
