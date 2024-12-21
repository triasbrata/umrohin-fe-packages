import apiServices from '@apps/packages/services'
import {
  CustomerServiceUpdateItemBody,
  CustomerServiceUpdateItemParams,
  CustomerServiceUpdateItemResponse,
} from '@apps/packages/services/master-customer-service'

import { queryKeyMasterCustomerService } from '@apps/packages/lib/constants/queryKeyMasterCustomerService'
import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CustomerServiceUpdateItemResponse, CustomerServiceUpdateItemBody>
}

type ParamsType = CustomerServiceUpdateItemParams & CustomerServiceUpdateItemBody

export const useUpdateCustomerService = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: (res) => res.message,
    invalidateQueryKey: [queryKeyMasterCustomerService.CUSTOMER_SERVICE_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterPositions.updateCustomerService({ params: { id }, body })
    },
    mutationOptions,
  })
}
