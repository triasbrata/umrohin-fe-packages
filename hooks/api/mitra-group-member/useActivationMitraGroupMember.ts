import { queryKeyMitraGroupMember } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MitraGroupMemberActivationItemBody,
  MitraGroupMemberActivationItemParams,
  MitraGroupMemberActivationItemResponse,
} from '@apps/packages/services/mitra-group-member'
import { useState } from 'react'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MitraGroupMemberActivationItemResponse, MitraGroupMemberActivationItemParams>
}

export const useActivationMitraGroupMember = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  return useMutateItem({
    successMessage: () => successMessage,
    errorMessage: () => errorMessage,
    invalidateQueryKey: [queryKeyMitraGroupMember.MITRA_GROUP_MEMBER_LIST],
    mutationFn: (params: MitraGroupMemberActivationItemParams & MitraGroupMemberActivationItemBody) => {
      const { id, ...body } = params
      setSuccessMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      setErrorMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      return apiServices.mitraGroupMember.activationItem({ params, body })
    },
    mutationOptions,
  })
}
