import { queryKeyMitraGroup } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { MitraGroupDeleteItemParams, MitraGroupDeleteItemResponse } from '@apps/packages/services/mitra-group'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MitraGroupDeleteItemResponse, MitraGroupDeleteItemParams>
}

export const useDeleteMitraGroup = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMitraGroup.MITRA_GROUP_LIST],
    mutationFn: (params: MitraGroupDeleteItemParams) => apiServices.mitraGroup.deleteItem({ params }),
    mutationOptions,
  })
}
