import { queryKeyAuth } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { UserManagementPasswordBody, UserManagementPasswordResponse } from '@apps/packages/services/auth'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<UserManagementPasswordResponse, UserManagementPasswordBody>
}

export const useUserManagementPassword = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    errorMessage: (res) => res.meta.message,
    mutationFn: (body: UserManagementPasswordBody) => apiServices.auth.userManagementPassword({ body }),
    mutationOptions,
  })
}
