import { queryKeyCustomerVisas } from '@apps/packages/lib/constants/queryKeyCustomerVisa'
import { CustomerVisaListItem } from '@apps/packages/services/customer-visa'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useCustomerVisaDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<CustomerVisaListItem>
}

export const useCustomerVisaDetail = (opt?: useCustomerVisaDetailConfig) => {
  const { queryKey = [queryKeyCustomerVisas.CUSTOMER_VISA_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerVisaListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    from_airport_id: '',
    to_airport_id: '',
    airline_id: '',
    no: '',
    prefix: '',
    ref_no: '',
    channel_id: '',
    currency_id: '',
    total: 0,
    discount: 0,
    tax_percentage: 0,
    tax_price: 0,
    fee: '',
    others: '',
    grand_total: 0,
    payment_token: '',
    payment_id: '',
    payment_expired: '',
    payment_status: '',
    payment_time: '',
    fraud_status: '',
    transaction_status: '',
    payment_vendor: '',
    note: '',
    from_name: '',
    to_name: '',
    airline_code: '',
    airline_name: '',
    hotel_name: '',
    vehicle_name: '',
    vehicle_no: '',
    journey_type: '',
    type: '',
    status_id: '',
    user_id: '',
    product_id: '',
    discount_price: '',
  }

  return useQuery<CustomerVisaListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
