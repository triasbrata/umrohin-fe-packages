import { queryKeyMasterTourLeader } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  TourLeaderUpdateItemBody,
  TourLeaderUpdateItemParams,
  TourLeaderUpdateItemResponse,
} from '@apps/packages/services/master-tour-leader'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<TourLeaderUpdateItemResponse, TourLeaderUpdateItemBody>
}

type ParamsType = TourLeaderUpdateItemParams & TourLeaderUpdateItemBody

export const useUpdateTourLeader = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterTourLeader.MASTER_TOUR_LEADER_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterTourLeader.updateItem({ params, body })
    },
    mutationOptions,
  })
}
