import { queryKeyCustomers } from '@apps/split/lib/constants'
import apiServices from '@apps/services'
import { CustomerCreateItemBody, CustomerCreateItemResponse } from '@apps/split/services/customers'

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
