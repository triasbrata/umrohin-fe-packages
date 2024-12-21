import apiServices from '@apps/packages/services'
import {
  PositionActivationItemBody,
  PositionActivationItemParams,
  PositionActivationItemResponse,
} from '@apps/packages/services/master-customer-service'

import { queryKeyMasterCustomerService } from '@apps/packages/lib/constants/queryKeyMasterCustomerService'
import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PositionActivationItemResponse, PositionActivationItemBody>
}

type ParamsType = PositionActivationItemParams & PositionActivationItemBody

export const useActivateCustomerService = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterCustomerService.CUSTOMER_SERVICE_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterPositions.activatePosition({ params: { id }, body })
    },
    mutationOptions,
  })
}
