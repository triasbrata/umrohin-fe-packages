import { queryKeyMitraGroup } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { MitraGroupUploadBody, MitraGroupUploadResponse } from '@apps/packages/services/mitra-group'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MitraGroupUploadResponse, MitraGroupUploadBody>
}

export const useUploadMitraGroup = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil diupload',
    errorMessage: (res) => res.meta.message,
    invalidateQueryKey: [queryKeyMitraGroup.MITRA_GROUP_LIST],
    mutationFn: (body: MitraGroupUploadBody) => apiServices.mitraGroup.uploadItem({ body }),
    mutationOptions,
  })
}
