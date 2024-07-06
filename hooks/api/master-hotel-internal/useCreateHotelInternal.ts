import { queryKeyMasterHotelInternal } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterHotelInternalCreateItemBody,
  MasterHotelInternalCreateItemResponse,
} from '@apps/packages/services/master-hotel-internal'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterHotelInternalCreateItemResponse, MasterHotelInternalCreateItemBody>
}

export const useCreateHotelInternal = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyMasterHotelInternal.MASTER_HOTEL_INTERNAL_LIST],
    mutationFn: (body: MasterHotelInternalCreateItemBody) => apiServices.masterHotelInternal.createItem({ body }),
    mutationOptions,
  })
}
