import { queryKeyMasterFlightRoute } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterFlightRouteCreateItemBody,
  MasterFlightRouteCreateItemResponse,
} from '@apps/packages/services/master-flight-route'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterFlightRouteCreateItemResponse, MasterFlightRouteCreateItemBody>
}

export const useCreateFlightRoute = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyMasterFlightRoute.MASTER_FLIGHT_ROUTE_LIST],
    mutationFn: (body: MasterFlightRouteCreateItemBody) => apiServices.masterFlightRoute.createItem({ body }),
    mutationOptions,
  })
}
