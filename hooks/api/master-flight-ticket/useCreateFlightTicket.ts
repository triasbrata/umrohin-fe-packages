import { queryKeyMasterFlightTicket } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterFlightTicketCreateItemBody,
  MasterFlightTicketCreateItemResponse,
} from '@apps/packages/services/master-flight-ticket'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterFlightTicketCreateItemResponse, MasterFlightTicketCreateItemBody>
}

export const useCreateFlightTicket = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyMasterFlightTicket.MASTER_FLIGHT_TICKET_LIST],
    mutationFn: (body: MasterFlightTicketCreateItemBody) => apiServices.masterFlightTicket.createItem({ body }),
    mutationOptions,
  })
}
