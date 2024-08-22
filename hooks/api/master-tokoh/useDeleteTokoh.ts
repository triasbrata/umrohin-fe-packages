import { queryKeyMasterTokoh } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { TokohDeleteItemParams, TokohDeleteItemResponse } from '@apps/packages/services/master-tokoh'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<TokohDeleteItemResponse, TokohDeleteItemParams>
}

export const useDeleteTokoh = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterTokoh.MASTER_TOKOH_LIST],
    mutationFn: (params: TokohDeleteItemParams) => apiServices.masterTokoh.deleteTokoh({ params }),
    mutationOptions,
  })
}
