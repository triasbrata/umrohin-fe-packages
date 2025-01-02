import { queryKeyMasterStatusHistory } from '@apps/packages/lib/constants/queryKeyMasterStatusHistory'
import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import apiServices from '@apps/packages/services'
import {
  MasterStatusHistoryActivationItemBody,
  MasterStatusHistoryActivationItemParams,
  MasterStatusHistoryActivationItemResponse,
} from '@apps/packages/services/master-status-history'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<
    MasterStatusHistoryActivationItemResponse,
    MasterStatusHistoryActivationItemBody
  >
}

type ParamsType = MasterStatusHistoryActivationItemParams & MasterStatusHistoryActivationItemBody

export const useActivateStatusHistory = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterStatusHistory.MASTER_STATUS_HISTORY_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterStatusHistory.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
