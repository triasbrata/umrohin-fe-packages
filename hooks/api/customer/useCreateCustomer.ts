import { queryKeyCustomer } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { CustomerCreateItemBody, CustomerCreateItemResponse } from '@apps/packages/services/customer'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CustomerCreateItemResponse, CustomerCreateItemBody>
}

export const useCreateCustomer = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyCustomer.CUSTOMER_LIST],
    mutationFn: (body: CustomerCreateItemBody) => apiServices.customer.createItem({ body }),
    mutationOptions,
  })
}
