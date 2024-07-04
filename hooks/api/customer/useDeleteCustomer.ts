import { queryKeyCustomer } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { CustomerDeleteItemParams, CustomerDeleteItemResponse } from '@apps/packages/services/customer'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CustomerDeleteItemResponse, CustomerDeleteItemParams>
}

export const useDeleteCustomer = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyCustomer.CUSTOMER_LIST],
    mutationFn: (params: CustomerDeleteItemParams) => apiServices.customer.deleteItem({ params }),
    mutationOptions,
  })
}
