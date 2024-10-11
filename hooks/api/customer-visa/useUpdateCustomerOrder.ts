import { queryKeyCustomerOrder } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import {
  CustomerOrderUpdateItemBody,
  CustomerOrderUpdateItemParams,
  CustomerOrderUpdateItemResponse,
} from '@apps/packages/services/customer-order'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CustomerOrderUpdateItemResponse, CustomerOrderUpdateItemParams>
}

type ParamsType = CustomerOrderUpdateItemParams & CustomerOrderUpdateItemBody

export const useUpdateCustomerOrder = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dibatalkan',
    errorMessage: () => 'Data gagal dibatalkan',
    invalidateQueryKey: [queryKeyCustomerOrder.CUSTOMER_ORDER_DETAIL],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.customerOrder.updateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
