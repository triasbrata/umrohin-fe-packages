import { queryKeyMasterHotel } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { HotelDeleteItemParams, HotelDeleteItemResponse } from '@apps/packages/services/master-hotel'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<HotelDeleteItemResponse, HotelDeleteItemParams>
}

export const useDeleteHotel = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterHotel.MASTER_HOTEL_LIST],
    mutationFn: (params: HotelDeleteItemParams) => apiServices.masterHotel.deleteItem({ params }),
    mutationOptions,
  })
}
