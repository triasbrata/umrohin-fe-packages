import apiServices from '@apps/packages/services'
import { UserValidateBody, UserValidateResponse } from '@apps/packages/services/auth'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<UserValidateResponse, UserValidateBody>
}

export const useUserValidate = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    // successMessage: (res) => res.meta.message,
    errorMessage: (res) => res.meta.message,
    mutationFn: (body: UserValidateBody) => apiServices.auth.userValidate({ body }),
    mutationOptions,
  })
}
