import { queryKeyMasterTourLeader } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  TourLeaderActivationItemBody,
  TourLeaderActivationItemParams,
  TourLeaderActivationItemResponse,
} from '@apps/packages/services/master-tour-leader'
import { useState } from 'react'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<TourLeaderActivationItemResponse, TourLeaderActivationItemParams>
}

export const useActivationTourLeader = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  return useMutateItem({
    successMessage: () => successMessage,
    errorMessage: () => errorMessage,
    invalidateQueryKey: [queryKeyMasterTourLeader.MASTER_TOUR_LEADER_LIST],
    mutationFn: (params: TourLeaderActivationItemParams & TourLeaderActivationItemBody) => {
      const { id, ...body } = params
      setSuccessMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      setErrorMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      return apiServices.masterTourLeader.activationItem({ params, body })
    },
    mutationOptions,
  })
}
