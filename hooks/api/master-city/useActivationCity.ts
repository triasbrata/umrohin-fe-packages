import { queryKeyMasterCity } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  CityActivationItemBody,
  CityActivationItemParams,
  CityActivationItemResponse,
} from '@apps/packages/services/master-city'
import { useState } from 'react'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CityActivationItemResponse, CityActivationItemParams>
}

export const useActivationCity = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  return useMutateItem({
    successMessage: () => successMessage,
    errorMessage: () => errorMessage,
    invalidateQueryKey: [queryKeyMasterCity.MASTER_CITY_LIST],
    mutationFn: (params: CityActivationItemParams & CityActivationItemBody) => {
      const { id, ...body } = params
      setSuccessMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      setErrorMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      return apiServices.masterCity.activationItem({ params, body })
    },
    mutationOptions,
  })
}
