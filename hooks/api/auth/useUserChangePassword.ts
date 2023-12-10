import { queryKeyAuth } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { UserChangePasswordBody, UserChangePasswordResponse } from '@apps/packages/services/auth'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<UserChangePasswordResponse, UserChangePasswordBody>
}

export const useUserChangePassword = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    mutationKey: [queryKeyAuth.CHANGE_PASSWORD],
    errorMessage: (res) => res.meta.message,
    mutationFn: (body: UserChangePasswordBody) => apiServices.auth.userChangePassword({ body }),
    mutationOptions,
  })
}
