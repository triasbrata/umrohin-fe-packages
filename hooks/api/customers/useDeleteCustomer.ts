import { queryKeyCustomers } from '@apps/packages/lib/constants'
import apiServices from '@apps/services'
import { CustomerDeleteItemParams, CustomerDeleteItemResponse } from '@apps/packages/services/customers'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CustomerDeleteItemResponse, CustomerDeleteItemParams>
}

export const useDeleteCustomer = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: (res) => res.meta.message,
    invalidateQueryKey: [queryKeyCustomers.CUSTOMER_LIST],
    mutationFn: (params: CustomerDeleteItemParams) => apiServices.customer.deleteItem({ params }),
    mutationOptions,
  })
}
