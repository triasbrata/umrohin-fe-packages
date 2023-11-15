import { queryKeyInternalUser } from '@apps/split/lib/constants'
import apiServices from '@apps/services'
import { InternalUserDeleteItemParams, InternalUserDeleteItemResponse } from '@apps/split/services/internal-user'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<InternalUserDeleteItemResponse, InternalUserDeleteItemParams>
}

export const useDeleteInternalUser = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyInternalUser.INTERNAL_USER_LIST],
    mutationFn: (params: InternalUserDeleteItemParams) => apiServices.internalUser.deleteItem({ params }),
    mutationOptions,
  })
}
