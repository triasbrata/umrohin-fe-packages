import { queryKeyPackageFlightTicket } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  PackageFlightTicketDeleteItemParams,
  PackageFlightTicketDeleteItemResponse,
} from '@apps/packages/services/package-flight-ticket'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageFlightTicketDeleteItemResponse, PackageFlightTicketDeleteItemParams>
}

export const useDeleteFlightTicket = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyPackageFlightTicket.PACKAGE_FLIGHT_TICKET_LIST],
    mutationFn: (params: PackageFlightTicketDeleteItemParams) => apiServices.packageFlightTicket.deleteItem({ params }),
    mutationOptions,
  })
}
