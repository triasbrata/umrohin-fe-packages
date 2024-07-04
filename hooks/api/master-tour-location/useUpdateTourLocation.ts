import { queryKeyMasterTourLocation } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterTourLocationUpdateItemBody,
  MasterTourLocationUpdateItemParams,
  MasterTourLocationUpdateItemResponse,
} from '@apps/packages/services/master-tour-location'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterTourLocationUpdateItemResponse, MasterTourLocationUpdateItemBody>
}

type ParamsType = MasterTourLocationUpdateItemParams & MasterTourLocationUpdateItemBody

export const useUpdateTourLocation = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterTourLocation.MASTER_TOUR_LOCATION_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterTourLocation.updateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
