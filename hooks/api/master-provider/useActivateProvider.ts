import { queryKeyMasterProvider } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterProviderActivationItemBody,
  MasterProviderActivationItemParams,
  MasterProviderActivationItemResponse,
} from '@apps/packages/services/master-provider'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterProviderActivationItemResponse, MasterProviderActivationItemBody>
}

type ParamsType = MasterProviderActivationItemParams & MasterProviderActivationItemBody

export const useActivateProvider = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterProvider.MASTER_PROVIDER_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterProvider.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
