import apiServices from '@apps/packages/services'
import { UserCheckPhoneNumberBody, UserCheckPhoneNumberResponse } from '@apps/packages/services/auth'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<UserCheckPhoneNumberResponse, UserCheckPhoneNumberBody>
}

export const useUserCheckPhoneNumber = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    // successMessage: (res) => res.meta.message,
    errorMessage: (res) => res.meta.message,
    mutationFn: (body: UserCheckPhoneNumberBody) => apiServices.auth.userCheckPhoneNumber({ body }),
    mutationOptions,
  })
}
