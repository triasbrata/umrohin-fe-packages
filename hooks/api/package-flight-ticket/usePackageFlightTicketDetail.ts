import { queryKeyPackageFlightTicket } from '@apps/packages/lib/constants'
import { PackageFlightTicketListItem } from '@apps/packages/services/package-flight-ticket'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type usePackageFlightTicketDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<PackageFlightTicketListItem>
}

export const usePackageFlightTicketDetail = (opt?: usePackageFlightTicketDetailConfig) => {
  const { queryKey = [queryKeyPackageFlightTicket.PACKAGE_FLIGHT_TICKET_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: PackageFlightTicketListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    rute_id: '',
    rute: {
      id: '',
      from_airport_id: '',
      to_airport_id: '',
      airport_from: {
        code: '',
        city_name: '',
      },
      airport_to: {
        code: '',
        city_name: '',
      },
      city_from: {
        code: '',
        name: '',
      },
      city_to: {
        code: '',
        name: '',
      },
    },
    airline_id: '',
    airline: {
      code: '',
      name: '',
    },
    provider_id: '',
    provider: {
      name: '',
    },
    departure_date: '',
    arrived_date: '',
    departure_time: '',
    arrived_time: '',
    class_id: '',
    class: {
      code: '',
      name: '',
    },
    price: '',
    discount_percentage: '',
    discount_price: '',
    final_price: '',
    is_transit: true,
    is_active: true,
    flight_code: '',
    ticket_no: '',
    meals: true,
    terminal_arrived: '',
    baggage: '',
    cabin_baggage: '',
    tickets_count: '',
    tickets_ready: '',
  }

  return useQuery<PackageFlightTicketListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    ...options,
  })
}
