import { queryKeyCustomers } from '@apps/packages/lib/constants'
import { CustomerListItem } from '@apps/packages/services/customers'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useCustomerDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<CustomerListItem>
}

export const useCustomerDetail = (opt?: useCustomerDetailConfig) => {
  const { queryKey = [queryKeyCustomers.CUSTOMER_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerListItem = queryClient.getQueryData(queryKey) ?? {
    costumer_id: '',
    user_id: '',
    user: {
      status: 0,
      name: '',
      phone_number: '',
      email: '',
    },
    is_highlight: false,
  }

  return useQuery<CustomerListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    ...options,
  })
}
