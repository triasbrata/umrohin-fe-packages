import { queryKeyMasterFlightRoute } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterFlightRouteDeleteItemParams,
  MasterFlightRouteDeleteItemResponse,
} from '@apps/packages/services/master-flight-route'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterFlightRouteDeleteItemResponse, MasterFlightRouteDeleteItemParams>
}

export const useDeleteFlightRoute = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterFlightRoute.MASTER_FLIGHT_ROUTE_LIST],
    mutationFn: (params: MasterFlightRouteDeleteItemParams) => apiServices.masterFlightRoute.deleteItem({ params }),
    mutationOptions,
  })
}
