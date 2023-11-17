import { queryKeyCustomerTransactions } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  CustomerTransactionUpdateItemBody,
  CustomerTransactionUpdateItemParams,
  CustomerTransactionUpdateItemResponse,
} from '@apps/packages/services/customer-transactions'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CustomerTransactionUpdateItemResponse, CustomerTransactionUpdateItemBody>
}

type ParamsType = CustomerTransactionUpdateItemParams & CustomerTransactionUpdateItemBody

export const useUpdateCustomerTransaction = (args: MutationArgs) => {
  const { mutationOptions } = args
  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyCustomerTransactions.CUSTOMER_TRANSACTION_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.customerTransaction.updateItem({ params, body })
    },
    mutationOptions,
  })
}
