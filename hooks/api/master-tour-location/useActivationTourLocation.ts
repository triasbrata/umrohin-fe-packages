import { queryKeyMasterTourLocation } from '@apps/packages/lib/constants'
import apiServices from '@apps/services'
import {
  MasterTourLocationActivationItemBody,
  MasterTourLocationActivationItemParams,
  MasterTourLocationActivationItemResponse,
} from '@apps/packages/services/master-tour-location'
import { useState } from 'react'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<
    MasterTourLocationActivationItemResponse,
    MasterTourLocationActivationItemParams
  >
}

type ParamsType = MasterTourLocationActivationItemParams & MasterTourLocationActivationItemBody

export const useActivationTourLocation = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  return useMutateItem({
    successMessage: () => successMessage,
    errorMessage: () => errorMessage,
    invalidateQueryKey: [queryKeyMasterTourLocation.MASTER_TOUR_LOCATION_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      setSuccessMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      setErrorMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      return apiServices.masterTourLocation.activationItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
