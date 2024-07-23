import { queryKeyMasterFlightTicket } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterFlightTicketUpdateItemBody,
  MasterFlightTicketUpdateItemParams,
  MasterFlightTicketUpdateItemResponse,
} from '@apps/packages/services/master-flight-ticket'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterFlightTicketUpdateItemResponse, MasterFlightTicketUpdateItemBody>
}

type ParamsType = MasterFlightTicketUpdateItemParams & MasterFlightTicketUpdateItemBody

export const useUpdateFlightTicket = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterFlightTicket.MASTER_FLIGHT_TICKET_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterFlightTicket.updateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
