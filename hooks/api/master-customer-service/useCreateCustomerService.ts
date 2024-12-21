import apiServices from '@apps/packages/services'
import {
  CustomerServiceCreateItemBody,
  CustomerServiceCreateItemResponse,
} from '@apps/packages/services/master-customer-service'

import { queryKeyMasterCustomerService } from '@apps/packages/lib/constants/queryKeyMasterCustomerService'
import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CustomerServiceCreateItemResponse, CustomerServiceCreateItemBody>
}

export const useCreateCustomerService = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.message,
    invalidateQueryKey: [queryKeyMasterCustomerService.CUSTOMER_SERVICE_LIST],
    mutationFn: (body: CustomerServiceCreateItemBody) => apiServices.masterPositions.createCustomerService({ body }),
    mutationOptions,
  })
}
