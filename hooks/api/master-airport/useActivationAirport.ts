import { queryKeyMasterAirport } from '@apps/packages/lib/constants'
import apiServices from '@apps/services'
import {
  MasterAirportActivationItemBody,
  MasterAirportActivationItemParams,
  MasterAirportActivationItemResponse,
} from '@apps/packages/services/master-airport'
import { useState } from 'react'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterAirportActivationItemResponse, MasterAirportActivationItemParams>
}

type ParamsType = MasterAirportActivationItemParams & MasterAirportActivationItemBody

export const useActivationAirport = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  return useMutateItem({
    successMessage: () => successMessage,
    errorMessage: () => errorMessage,
    invalidateQueryKey: [queryKeyMasterAirport.MASTER_AIRPORT_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      setSuccessMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      setErrorMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      return apiServices.masterAirport.activationItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
