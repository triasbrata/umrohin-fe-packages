import { queryKeyCustomerTransactions } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  CustomerTransactionCreateItemBody,
  CustomerTransactionCreateItemResponse,
} from '@apps/packages/services/customer-transactions'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CustomerTransactionCreateItemResponse, CustomerTransactionCreateItemBody>
}

export const useCreateCustomerTransaction = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyCustomerTransactions.CUSTOMER_TRANSACTION_LIST],
    mutationFn: (body: CustomerTransactionCreateItemBody) => apiServices.customerTransaction.createItem({ body }),
    mutationOptions,
  })
}
