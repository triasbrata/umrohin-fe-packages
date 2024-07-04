import { queryKeyMasterTourLeader } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { TourLeaderDeleteItemParams, TourLeaderDeleteItemResponse } from '@apps/packages/services/master-tour-leader'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<TourLeaderDeleteItemResponse, TourLeaderDeleteItemParams>
}

export const useDeleteTourLeader = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterTourLeader.MASTER_TOUR_LEADER_LIST],
    mutationFn: (params: TourLeaderDeleteItemParams) => apiServices.masterTourLeader.deleteItem({ params }),
    mutationOptions,
  })
}
