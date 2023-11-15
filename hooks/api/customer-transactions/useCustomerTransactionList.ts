import { queryKeyCustomerTransactions } from '@apps/packages/lib/constants'
import { CustomerTransactionListItem } from '@apps/packages/services/customer-transactions'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type useCustomerTransactionListConfig = {
	queryKey?: QueryKey
	options?: UseQueryOptions<CustomerTransactionListItem[]>
}

export const useCustomerTransactionList = (opt?: useCustomerTransactionListConfig) => {
	const { queryKey = [queryKeyCustomerTransactions.CUSTOMER_TRANSACTION_LIST], options } = opt ?? {}
	const queryClient = useQueryClient()
	const placeholderData: CustomerTransactionListItem[] = queryClient.getQueryData(queryKey) ?? []

	return useQuery<CustomerTransactionListItem[]>({
		queryKey,
		queryFn: () => placeholderData,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		...options,
	})
}
