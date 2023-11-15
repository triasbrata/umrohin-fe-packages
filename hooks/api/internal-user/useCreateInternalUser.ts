import { queryKeyInternalUser } from '@apps/packages/lib/constants'
import apiServices from '@apps/services'
import { InternalUserCreateItemBody, InternalUserCreateItemResponse } from '@apps/packages/services/internal-user'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<InternalUserCreateItemResponse, InternalUserCreateItemBody>
}

export const useCreateInternalUser = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyInternalUser.INTERNAL_USER_LIST],
    mutationFn: (body: InternalUserCreateItemBody) => apiServices.internalUser.createItem({ body }),
    mutationOptions,
  })
}
