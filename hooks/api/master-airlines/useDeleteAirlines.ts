import { queryKeyMasterAirlines } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { AirlinesDeleteItemParams, AirlinesDeleteItemResponse } from '@apps/packages/services/master-airlines'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<AirlinesDeleteItemResponse, AirlinesDeleteItemParams>
}

export const useDeleteAirlines = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterAirlines.MASTER_AIRLINES_LIST],
    mutationFn: (params: AirlinesDeleteItemParams) => apiServices.masterAirlines.deleteItem({ params }),
    mutationOptions,
  })
}
