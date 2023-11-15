import { queryKeyMasterThematics } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { ThematicCreateItemBody, ThematicCreateItemResponse } from '@apps/packages/services/master-thematics'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<ThematicCreateItemResponse, ThematicCreateItemBody>
}

export const useCreateThematic = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.meta.message,
    invalidateQueryKey: [queryKeyMasterThematics.MASTER_THEMATIC_LIST],
    mutationFn: (body: ThematicCreateItemBody) => apiServices.masterThematic.createItem({ body }),
    mutationOptions,
  })
}
