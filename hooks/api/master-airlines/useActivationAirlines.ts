import { queryKeyMasterAirlines } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  AirlinesActivationItemBody,
  AirlinesActivationItemParams,
  AirlinesActivationItemResponse,
} from '@apps/packages/services/master-airlines'
import { useState } from 'react'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<AirlinesActivationItemResponse, AirlinesActivationItemParams>
}

export const useActivationAirlines = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  return useMutateItem({
    successMessage: () => successMessage,
    errorMessage: () => errorMessage,
    invalidateQueryKey: [queryKeyMasterAirlines.MASTER_AIRLINES_LIST],
    mutationFn: (params: AirlinesActivationItemParams & AirlinesActivationItemBody) => {
      const { id, ...body } = params
      setSuccessMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      setErrorMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      return apiServices.masterAirlines.activationItem({ params, body })
    },
    mutationOptions,
  })
}
