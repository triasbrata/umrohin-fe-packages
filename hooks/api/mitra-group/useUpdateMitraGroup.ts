import { queryKeyMitraGroup } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MitraGroupUpdateItemBody,
  MitraGroupUpdateItemParams,
  MitraGroupUpdateItemResponse,
} from '@apps/packages/services/mitra-group'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MitraGroupUpdateItemResponse, MitraGroupUpdateItemBody>
}

type ParamsType = MitraGroupUpdateItemParams & MitraGroupUpdateItemBody

export const useUpdateMitraGroup = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: (res) => res.meta.message,
    invalidateQueryKey: [queryKeyMitraGroup.MITRA_GROUP_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.mitraGroup.updateItem({ params, body })
    },
    mutationOptions,
  })
}
