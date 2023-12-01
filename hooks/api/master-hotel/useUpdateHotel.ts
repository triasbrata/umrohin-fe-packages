import { queryKeyMasterHotel } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  HotelUpdateItemBody,
  HotelUpdateItemParams,
  HotelUpdateItemResponse,
} from '@apps/packages/services/master-hotel'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<HotelUpdateItemResponse, HotelUpdateItemBody>
}

type ParamsType = HotelUpdateItemParams & HotelUpdateItemBody

export const useUpdateHotel = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: (res) => res.meta.message,
    invalidateQueryKey: [queryKeyMasterHotel.MASTER_HOTEL_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterHotel.updateItem({ params, body })
    },
    mutationOptions,
  })
}
