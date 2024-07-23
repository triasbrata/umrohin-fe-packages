import { queryKeyMasterProvider } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterProviderUpdateItemBody,
  MasterProviderUpdateItemParams,
  MasterProviderUpdateItemResponse,
} from '@apps/packages/services/master-provider'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterProviderUpdateItemResponse, MasterProviderUpdateItemBody>
}

type ParamsType = MasterProviderUpdateItemParams & MasterProviderUpdateItemBody

export const useUpdateProvider = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterProvider.MASTER_PROVIDER_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterProvider.updateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
