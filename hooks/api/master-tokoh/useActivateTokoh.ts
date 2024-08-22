import { queryKeyMasterFlightRoute, queryKeyMasterTokoh } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterTokohActivationItemBody,
  MasterTokohActivationItemParams,
  MasterTokohActivationItemResponse,
} from '@apps/packages/services/master-tokoh'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterTokohActivationItemResponse, MasterTokohActivationItemBody>
}

type ParamsType = MasterTokohActivationItemParams & MasterTokohActivationItemBody

export const useActivateTokoh = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterTokoh.MASTER_TOKOH_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterTokoh.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
