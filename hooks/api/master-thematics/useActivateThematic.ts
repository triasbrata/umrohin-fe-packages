import { queryKeyMasterThematics } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  ThematicActivationItemBody,
  ThematicActivationItemParams,
  ThematicActivationItemResponse,
} from '@apps/packages/services/master-thematics'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<ThematicActivationItemResponse, ThematicActivationItemBody>
}

type ParamsType = ThematicActivationItemParams & ThematicActivationItemBody

export const useActivateThematic = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterThematics.MASTER_THEMATIC_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterThematic.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
