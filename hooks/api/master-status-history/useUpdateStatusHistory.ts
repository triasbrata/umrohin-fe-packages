import { queryKeyMasterStatusHistory } from '@apps/packages/lib/constants/queryKeyMasterStatusHistory'
import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import apiServices from '@apps/packages/services'
import {
  MasterStatusHistoryUpdateItemBody,
  MasterStatusHistoryUpdateItemParams,
  MasterStatusHistoryUpdateItemResponse,
} from '@apps/packages/services/master-status-history'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterStatusHistoryUpdateItemResponse, MasterStatusHistoryUpdateItemBody>
}

type ParamsType = MasterStatusHistoryUpdateItemParams & MasterStatusHistoryUpdateItemBody

export const useUpdateStatusHistory = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: (res) => res.message,
    invalidateQueryKey: [queryKeyMasterStatusHistory.MASTER_STATUS_HISTORY_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterStatusHistory.updateItem({ params, body })
    },
    mutationOptions,
  })
}
