import { queryKeyMasterAirport } from '@apps/packages/lib/constants'
import apiServices from '@apps/services'
import {
  MasterAirportUpdateItemBody,
  MasterAirportUpdateItemParams,
  MasterAirportUpdateItemResponse,
} from '@apps/packages/services/master-airport'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterAirportUpdateItemResponse, MasterAirportUpdateItemBody>
}

type ParamsType = MasterAirportUpdateItemParams & MasterAirportUpdateItemBody

export const useUpdateAirport = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterAirport.MASTER_AIRPORT_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterAirport.updateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
