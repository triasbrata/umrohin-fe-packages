import { queryKeyMasterHotel } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { HotelCreateItemBody, HotelCreateItemResponse } from '@apps/packages/services/master-hotel'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<HotelCreateItemResponse, HotelCreateItemBody>
}

export const useCreateHotel = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.meta.message,
    invalidateQueryKey: [queryKeyMasterHotel.MASTER_HOTEL_LIST],
    mutationFn: (body: HotelCreateItemBody) => apiServices.masterHotel.createItem({ body }),
    mutationOptions,
  })
}
