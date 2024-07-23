import { queryKeyMasterFlightTicket } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterFlightTicketDeleteItemParams,
  MasterFlightTicketDeleteItemResponse,
} from '@apps/packages/services/master-flight-ticket'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterFlightTicketDeleteItemResponse, MasterFlightTicketDeleteItemParams>
}

export const useDeleteFlightTicket = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterFlightTicket.MASTER_FLIGHT_TICKET_LIST],
    mutationFn: (params: MasterFlightTicketDeleteItemParams) => apiServices.masterFlightTicket.deleteItem({ params }),
    mutationOptions,
  })
}
