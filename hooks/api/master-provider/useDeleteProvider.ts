import { queryKeyMasterProvider } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterProviderDeleteItemParams,
  MasterProviderDeleteItemResponse,
} from '@apps/packages/services/master-provider'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterProviderDeleteItemResponse, MasterProviderDeleteItemParams>
}

export const useDeleteProvider = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterProvider.MASTER_PROVIDER_LIST],
    mutationFn: (params: MasterProviderDeleteItemParams) => apiServices.masterProvider.deleteItem({ params }),
    mutationOptions,
  })
}
