import apiServices from '@apps/packages/services'
import { AdminAuthLoginBody, AdminAuthLoginResponse } from '@apps/packages/services/auth'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<AdminAuthLoginResponse, AdminAuthLoginBody>
}

export const useAuthLogin = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: (res) => `Selamat datang, ${res.result?.userName}`,
    errorMessage: (res) => res.meta.message,
    mutationFn: (body: AdminAuthLoginBody) => apiServices.auth.adminLogin({ body }),
    mutationOptions,
  })
}
