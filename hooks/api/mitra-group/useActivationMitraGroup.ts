import { queryKeyMitraGroup } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MitraGroupActivationItemBody,
  MitraGroupActivationItemParams,
  MitraGroupActivationItemResponse,
} from '@apps/packages/services/mitra-group'
import { useState } from 'react'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MitraGroupActivationItemResponse, MitraGroupActivationItemParams>
}

export const useActivationMitraGroup = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  return useMutateItem({
    successMessage: () => successMessage,
    errorMessage: () => errorMessage,
    invalidateQueryKey: [queryKeyMitraGroup.MITRA_GROUP_LIST],
    mutationFn: (params: MitraGroupActivationItemParams & MitraGroupActivationItemBody) => {
      const { id, ...body } = params
      setSuccessMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      setErrorMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      return apiServices.mitraGroup.activationItem({ params, body })
    },
    mutationOptions,
  })
}
