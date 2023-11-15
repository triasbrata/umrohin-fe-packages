import { queryKeyCustomers } from '@apps/packages/lib/constants'
import apiServices from '@apps/services'
import { CustomerCreateItemBody, CustomerCreateItemResponse } from '@apps/packages/services/customers'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CustomerCreateItemResponse, CustomerCreateItemBody>
}

export const useCreateCustomer = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.meta.message,
    invalidateQueryKey: [queryKeyCustomers.CUSTOMER_LIST],
    mutationFn: (body: CustomerCreateItemBody) => apiServices.customer.createItem({ body }),
    mutationOptions,
  })
}
