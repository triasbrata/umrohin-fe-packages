import { queryKeyInternalUser } from '@apps/packages/lib/constants'
import apiServices from '@apps/services'
import {
  InternalUserActivationItemBody,
  InternalUserActivationItemParams,
  InternalUserActivationItemResponse,
} from '@apps/packages/services/internal-user'
import { useState } from 'react'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<InternalUserActivationItemResponse, InternalUserActivationItemParams>
}

type ParamsType = InternalUserActivationItemParams & InternalUserActivationItemBody

export const useActivationInternalUser = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  return useMutateItem({
    successMessage: () => successMessage,
    errorMessage: () => errorMessage,
    invalidateQueryKey: [queryKeyInternalUser.INTERNAL_USER_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      setSuccessMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      setErrorMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      return apiServices.internalUser.activationItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
