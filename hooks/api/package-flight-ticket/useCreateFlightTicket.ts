import { queryKeyPackageFlightTicket } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  PackageFlightTicketCreateItemBody,
  PackageFlightTicketCreateItemResponse,
} from '@apps/packages/services/package-flight-ticket'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageFlightTicketCreateItemResponse, PackageFlightTicketCreateItemBody>
}

export const useCreateFlightTicket = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyPackageFlightTicket.PACKAGE_FLIGHT_TICKET_LIST],
    mutationFn: (body: PackageFlightTicketCreateItemBody) => apiServices.packageFlightTicket.createItem({ body }),
    mutationOptions,
  })
}
