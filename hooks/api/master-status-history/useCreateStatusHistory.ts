import apiServices from '@apps/packages/services'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import {
  MasterStatusHistoryCreateItemBody,
  MasterStatusHistoryCreateItemResponse,
} from '@apps/packages/services/master-status-history'
import { queryKeyMasterStatusHistory } from '@apps/packages/lib/constants/queryKeyMasterStatusHistory'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterStatusHistoryCreateItemResponse, MasterStatusHistoryCreateItemBody>
}

export const useCreateStatusHistory = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.message,
    invalidateQueryKey: [queryKeyMasterStatusHistory.MASTER_STATUS_HISTORY_LIST],
    mutationFn: (body: MasterStatusHistoryCreateItemBody) => apiServices.masterStatusHistory.createItem({ body }),
    mutationOptions,
  })
}
