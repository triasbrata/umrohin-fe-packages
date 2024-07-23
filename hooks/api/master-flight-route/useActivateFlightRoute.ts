import { queryKeyMasterFlightRoute } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterFlightRouteActivationItemBody,
  MasterFlightRouteActivationItemParams,
  MasterFlightRouteActivationItemResponse,
} from '@apps/packages/services/master-flight-route'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterFlightRouteActivationItemResponse, MasterFlightRouteActivationItemBody>
}

type ParamsType = MasterFlightRouteActivationItemParams & MasterFlightRouteActivationItemBody

export const useActivateFlightRoute = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterFlightRoute.MASTER_FLIGHT_ROUTE_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterFlightRoute.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
