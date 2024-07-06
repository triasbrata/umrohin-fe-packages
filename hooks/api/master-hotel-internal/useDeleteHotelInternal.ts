import { queryKeyMasterHotelInternal } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterHotelInternalDeleteItemParams,
  MasterHotelInternalDeleteItemResponse,
} from '@apps/packages/services/master-hotel-internal'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterHotelInternalDeleteItemResponse, MasterHotelInternalDeleteItemParams>
}

export const useDeleteHotelInternal = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterHotelInternal.MASTER_HOTEL_INTERNAL_LIST],
    mutationFn: (params: MasterHotelInternalDeleteItemParams) => apiServices.masterHotelInternal.deleteItem({ params }),
    mutationOptions,
  })
}
