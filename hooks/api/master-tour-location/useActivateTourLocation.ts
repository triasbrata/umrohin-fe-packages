import { queryKeyMasterTourLocation } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterTourLocationActivationItemBody,
  MasterTourLocationActivationItemParams,
  MasterTourLocationActivationItemResponse,
} from '@apps/packages/services/master-tour-location'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterTourLocationActivationItemResponse, MasterTourLocationActivationItemBody>
}

type ParamsType = MasterTourLocationActivationItemParams & MasterTourLocationActivationItemBody

export const useActivateTourLocation = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterTourLocation.MASTER_TOUR_LOCATION_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterTourLocation.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
