import { queryKeyPackageFlightTicket } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  PackageFlightTicketActivationItemBody,
  PackageFlightTicketActivationItemParams,
  PackageFlightTicketActivationItemResponse,
} from '@apps/packages/services/package-flight-ticket'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<
    PackageFlightTicketActivationItemResponse,
    PackageFlightTicketActivationItemBody
  >
}

type ParamsType = PackageFlightTicketActivationItemParams & PackageFlightTicketActivationItemBody

export const useActivateFlightTicket = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyPackageFlightTicket.PACKAGE_FLIGHT_TICKET_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.packageFlightTicket.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
