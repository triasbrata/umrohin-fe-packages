import { queryKeyMasterAgency } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  AgencyActivationItemBody,
  AgencyActivationItemParams,
  AgencyUpdateItemResponse,
} from '@apps/packages/services/master-agency'
import { useState } from 'react'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<AgencyUpdateItemResponse, AgencyActivationItemParams>
}

export const useActivationAgency = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  return useMutateItem({
    successMessage: () => successMessage,
    errorMessage: () => errorMessage,
    invalidateQueryKey: [queryKeyMasterAgency.MASTER_AGENCY_LIST],
    mutationFn: (params: AgencyActivationItemParams & AgencyActivationItemBody) => {
      const { id, ...body } = params
      setSuccessMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      setErrorMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      return apiServices.masterAgency.activationItem({ params, body })
    },
    mutationOptions,
  })
}
