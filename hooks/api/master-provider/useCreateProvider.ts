import { queryKeyMasterProvider } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { MasterProviderCreateItemBody, MasterProviderCreateItemResponse } from '@apps/packages/services/master-provider'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterProviderCreateItemResponse, MasterProviderCreateItemBody>
}

export const useCreateProvider = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyMasterProvider.MASTER_PROVIDER_LIST],
    mutationFn: (body: MasterProviderCreateItemBody) => apiServices.masterProvider.createItem({ body }),
    mutationOptions,
  })
}
