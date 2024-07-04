import { queryKeyCustomer } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  CustomerUpdateItemBody,
  CustomerUpdateItemParams,
  CustomerUpdateItemResponse,
} from '@apps/packages/services/customer'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CustomerUpdateItemResponse, CustomerUpdateItemBody>
}

type ParamsType = CustomerUpdateItemParams & CustomerUpdateItemBody

export const useUpdateCustomer = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyCustomer.CUSTOMER_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.customer.updateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
