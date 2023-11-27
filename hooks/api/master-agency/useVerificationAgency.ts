import { queryKeyMasterAgency } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  AgencyVerificationItemBody,
  AgencyVerificationItemParams,
  AgencyUpdateItemResponse,
} from '@apps/packages/services/master-agency'
import { useState } from 'react'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<AgencyUpdateItemResponse, AgencyVerificationItemParams>
}

export const useVerificationAgency = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  return useMutateItem({
    successMessage: () => successMessage,
    errorMessage: () => errorMessage,
    invalidateQueryKey: [queryKeyMasterAgency.MASTER_AGENCY_LIST],
    mutationFn: (params: AgencyVerificationItemParams & AgencyVerificationItemBody) => {
      const { id, ...body } = params
      setSuccessMessage(body.verification_status === 1 ? 'Data berhasil diverifikasi' : 'Data berhasil ditolak')
      setErrorMessage(body.verification_status === 1 ? 'Data berhasil diverifikasi' : 'Data berhasil ditolak')
      return apiServices.masterAgency.verificationItem({ params, body })
    },
    mutationOptions,
  })
}
