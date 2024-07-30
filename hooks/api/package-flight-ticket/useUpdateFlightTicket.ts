import { queryKeyPackageFlightTicket } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  PackageFlightTicketUpdateItemBody,
  PackageFlightTicketUpdateItemParams,
  PackageFlightTicketUpdateItemResponse,
} from '@apps/packages/services/package-flight-ticket'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageFlightTicketUpdateItemResponse, PackageFlightTicketUpdateItemBody>
}

type ParamsType = PackageFlightTicketUpdateItemParams & PackageFlightTicketUpdateItemBody

export const useUpdateFlightTicket = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyPackageFlightTicket.PACKAGE_FLIGHT_TICKET_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.packageFlightTicket.updateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
