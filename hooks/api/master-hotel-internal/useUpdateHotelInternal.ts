import { queryKeyMasterHotelInternal } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterHotelInternalUpdateItemBody,
  MasterHotelInternalUpdateItemParams,
  MasterHotelInternalUpdateItemResponse,
} from '@apps/packages/services/master-hotel-internal'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterHotelInternalUpdateItemResponse, MasterHotelInternalUpdateItemBody>
}

type ParamsType = MasterHotelInternalUpdateItemParams & MasterHotelInternalUpdateItemBody

export const useUpdateHotelInternal = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterHotelInternal.MASTER_HOTEL_INTERNAL_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterHotelInternal.updateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
