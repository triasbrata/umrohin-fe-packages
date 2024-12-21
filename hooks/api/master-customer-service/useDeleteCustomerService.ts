import apiServices from '@apps/packages/services'
import {
  CustomerServiceDeleteItemParams,
  CustomerServiceDeleteItemResponse,
} from '@apps/packages/services/master-customer-service'

import { queryKeyMasterCustomerService } from '@apps/packages/lib/constants/queryKeyMasterCustomerService'
import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CustomerServiceDeleteItemResponse, CustomerServiceDeleteItemParams>
}

export const useDeleteCustomerService = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterCustomerService.CUSTOMER_SERVICE_LIST],
    mutationFn: (params: CustomerServiceDeleteItemParams) =>
      apiServices.masterPositions.deleteCustomerService({ params }),
    mutationOptions,
  })
}
