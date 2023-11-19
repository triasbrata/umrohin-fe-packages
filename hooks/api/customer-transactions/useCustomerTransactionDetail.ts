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
    customer_id: '',
    buy_date: '',
    first_dp: 0,
    payment_method: 'CASH',
    multiply: 0,
    package_id: '',
    transaction_number: '',
    user_name: '',
  }

  return useQuery<CustomerTransactionListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    ...options,
  })
}
