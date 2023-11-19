import { queryKeyCustomerTransactions } from '@apps/packages/lib/constants'
import { CustomerTransactionListItem } from '@apps/packages/services/customer-transactions'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useCustomerTransactionDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<CustomerTransactionListItem>
}

export const useCustomerTransactionDetail = (opt?: useCustomerTransactionDetailConfig) => {
  const { queryKey = [queryKeyCustomerTransactions.CUSTOMER_TRANSACTION_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: CustomerTransactionListItem = queryClient.getQueryData(queryKey) ?? {
    transaction_id: 0,
    customer_id: '',
    transaction_user: {
      name: '',
      phone_number: '',
    },
    transaction_package: {
      name: '',
      package_id: 0,
      thematic: '',
      agency_name: '',
    },
    multiply: 0,
    buy_date: '',
    transaction_package_price: {
      bed_type: '',
      price: 0,
    },
    payment_method: '',
    first_dp: 0,
    user_name: '',
    status: 0,
    package_map_price_id: 0,
    package_id: 0,
    transaction_number: '',
  }

  return useQuery<CustomerTransactionListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    ...options,
  })
}
