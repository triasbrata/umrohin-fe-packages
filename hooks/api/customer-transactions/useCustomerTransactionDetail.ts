import { queryKeyCustomerTransactions } from '@apps/split/lib/constants'
import { CustomerTransactionListItem } from '@apps/split/services/customer-transactions'
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
		customer_name: '',
		customer_phone: '',
		date: '',
		dp: 0,
		id: '',
		listing_category: '',
		listing_id: '',
		listing_name: '',
		payment_type: 'CASH',
		pic: '',
		qty: 0,
		room_id: '',
		room_name: '',
		room_price: 0,
		total_price: 0,
	}

	return useQuery<CustomerTransactionListItem>({
		queryKey,
		queryFn: () => placeholderData,
		refetchOnWindowFocus: false,
		...options,
	})
}
