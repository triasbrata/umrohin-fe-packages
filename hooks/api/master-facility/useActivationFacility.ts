import { queryKeyMasterFacility } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterFacilityActivationItemBody,
  MasterFacilityActivationItemParams,
  MasterFacilityActivationItemResponse,
} from '@apps/packages/services/master-facility'
import { useState } from 'react'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterFacilityActivationItemResponse, MasterFacilityActivationItemParams>
}

type ParamsType = MasterFacilityActivationItemParams & MasterFacilityActivationItemBody

export const useActivationFacility = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  return useMutateItem({
    successMessage: () => successMessage,
    errorMessage: () => errorMessage,
    invalidateQueryKey: [queryKeyMasterFacility.MASTER_FACILITY_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      setSuccessMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      setErrorMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      return apiServices.masterFacility.activationItem({ params, body })
    },
    mutationOptions,
  })
}
