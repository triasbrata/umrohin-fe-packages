import { queryKeyMasterThematics } from '@apps/split/lib/constants'
import apiServices from '@apps/services'
import { ThematicCreateItemBody, ThematicCreateItemResponse } from '@apps/split/services/master-thematics'

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
