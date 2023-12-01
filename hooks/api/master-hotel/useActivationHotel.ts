import { queryKeyMasterHotel } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  HotelActivationItemBody,
  HotelActivationItemParams,
  HotelActivationItemResponse,
} from '@apps/packages/services/master-hotel'
import { useState } from 'react'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<HotelActivationItemResponse, HotelActivationItemParams>
}

export const useActivationHotel = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  return useMutateItem({
    successMessage: () => successMessage,
    errorMessage: () => errorMessage,
    invalidateQueryKey: [queryKeyMasterHotel.MASTER_HOTEL_LIST],
    mutationFn: (params: HotelActivationItemParams & HotelActivationItemBody) => {
      const { id, ...body } = params
      setSuccessMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      setErrorMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      return apiServices.masterHotel.activationItem({ params, body })
    },
    mutationOptions,
  })
}
