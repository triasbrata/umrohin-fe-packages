import { queryKeyCustomerTransactions } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  CustomerTransactionDeleteItemParams,
  CustomerTransactionDeleteItemResponse,
} from '@apps/packages/services/customer-transactions'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CustomerTransactionDeleteItemResponse, CustomerTransactionDeleteItemParams>
}

export const useDeleteCustomerTransaction = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyCustomerTransactions.CUSTOMER_TRANSACTION_LIST],
    mutationFn: (params: CustomerTransactionDeleteItemParams) => apiServices.customerTransaction.deleteItem({ params }),
    mutationOptions,
  })
}
