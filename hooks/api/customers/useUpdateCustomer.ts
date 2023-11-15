import { queryKeyCustomers } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  CustomerUpdateItemBody,
  CustomerUpdateItemParams,
  CustomerUpdateItemResponse,
} from '@apps/packages/services/customers'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CustomerUpdateItemResponse, CustomerUpdateItemBody>
}

type ParamsType = CustomerUpdateItemParams & CustomerUpdateItemBody

export const useUpdateCustomer = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: (res) => res.meta.message,
    invalidateQueryKey: [queryKeyCustomers.CUSTOMER_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.customer.updateItem({ params, body })
    },
    mutationOptions,
  })
}
