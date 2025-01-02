import apiServices from '@apps/packages/services'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import {
  MasterStatusHistoryDeleteItemParams,
  MasterStatusHistoryDeleteItemResponse,
} from '@apps/packages/services/master-status-history'
import { queryKeyMasterStatusHistory } from '@apps/packages/lib/constants/queryKeyMasterStatusHistory'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterStatusHistoryDeleteItemResponse, MasterStatusHistoryDeleteItemParams>
}

export const useDeleteStatusHistory = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterStatusHistory.MASTER_STATUS_HISTORY_LIST],
    mutationFn: (params: MasterStatusHistoryDeleteItemParams) => apiServices.masterStatusHistory.deleteItem({ params }),
    mutationOptions,
  })
}
