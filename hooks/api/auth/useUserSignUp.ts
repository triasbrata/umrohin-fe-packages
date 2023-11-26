import { queryKeyAuth } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { UserSignUpBody, UserSignUpResponse } from '@apps/packages/services/auth'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<UserSignUpResponse, UserSignUpBody>
}

export const useUserSignUp = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    mutationKey: [queryKeyAuth.SIGN_UP],
    errorMessage: (res) => res.meta.message,
    mutationFn: (body: UserSignUpBody) => apiServices.auth.userSignUp({ body }),
    mutationOptions,
  })
}
