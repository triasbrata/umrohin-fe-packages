import { queryKeyMasterFlightTicket } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterFlightTicketActivationItemBody,
  MasterFlightTicketActivationItemParams,
  MasterFlightTicketActivationItemResponse,
} from '@apps/packages/services/master-flight-ticket'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterFlightTicketActivationItemResponse, MasterFlightTicketActivationItemBody>
}

type ParamsType = MasterFlightTicketActivationItemParams & MasterFlightTicketActivationItemBody

export const useActivateFlightTicket = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterFlightTicket.MASTER_FLIGHT_TICKET_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterFlightTicket.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
