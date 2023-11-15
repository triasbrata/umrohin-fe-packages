import { queryKeyMasterThematics } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  ThematicActivationItemBody,
  ThematicActivationItemParams,
  ThematicActivationItemResponse,
} from '@apps/packages/services/master-thematics'
import { useState } from 'react'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<ThematicActivationItemResponse, ThematicActivationItemParams>
}

export const useActivationThematic = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  return useMutateItem({
    successMessage: () => successMessage,
    errorMessage: () => errorMessage,
    invalidateQueryKey: [queryKeyMasterThematics.MASTER_THEMATIC_LIST],
    mutationFn: (params: ThematicActivationItemParams & ThematicActivationItemBody) => {
      const { id, ...body } = params
      setSuccessMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      setErrorMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      return apiServices.masterThematic.activationItem({ params, body })
    },
    mutationOptions,
  })
}
