import { queryKeyMasterTourLocation } from '@apps/packages/lib/constants'
import apiServices from '@apps/services'
import {
  MasterTourLocationDeleteItemParams,
  MasterTourLocationDeleteItemResponse,
} from '@apps/packages/services/master-tour-location'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterTourLocationDeleteItemResponse, MasterTourLocationDeleteItemParams>
}

export const useDeleteTourLocation = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterTourLocation.MASTER_TOUR_LOCATION_LIST],
    mutationFn: (params: MasterTourLocationDeleteItemParams) => apiServices.masterTourLocation.deleteItem({ params }),
    mutationOptions,
  })
}
