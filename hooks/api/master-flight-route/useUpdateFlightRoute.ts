import { queryKeyMasterFlightRoute } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterFlightRouteUpdateItemBody,
  MasterFlightRouteUpdateItemParams,
  MasterFlightRouteUpdateItemResponse,
} from '@apps/packages/services/master-flight-route'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterFlightRouteUpdateItemResponse, MasterFlightRouteUpdateItemBody>
}

type ParamsType = MasterFlightRouteUpdateItemParams & MasterFlightRouteUpdateItemBody

export const useUpdateFlightRoute = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterFlightRoute.MASTER_FLIGHT_ROUTE_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterFlightRoute.updateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
