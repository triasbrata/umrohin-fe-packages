import { queryKeyCustomer } from '@apps/packages/lib/constants'
import { CustomerListItem } from '@apps/packages/services/customer'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useCustomerDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<CustomerListItem>
}

export const useCustomerDetail = (opt?: useCustomerDetailConfig) => {
  const { queryKey = [queryKeyCustomer.CUSTOMER_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    name: '',
    email: '',
    password: '',
    status: '',
  }

  return useQuery<CustomerListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    ...options,
  })
}
