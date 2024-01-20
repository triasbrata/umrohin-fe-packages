import { queryKeyMitraGroup } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { MitraGroupCreateItemBody, MitraGroupCreateItemResponse } from '@apps/packages/services/mitra-group'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MitraGroupCreateItemResponse, MitraGroupCreateItemBody>
}

export const useCreateMitraGroup = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.meta.message,
    invalidateQueryKey: [queryKeyMitraGroup.MITRA_GROUP_LIST],
    mutationFn: (body: MitraGroupCreateItemBody) => apiServices.mitraGroup.createItem({ body }),
    mutationOptions,
  })
}
