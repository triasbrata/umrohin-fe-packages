import { queryKeyMasterAirport } from '@apps/packages/lib/constants'
import apiServices from '@apps/services'
import { MasterAirportDeleteItemParams, MasterAirportDeleteItemResponse } from '@apps/packages/services/master-airport'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterAirportDeleteItemResponse, MasterAirportDeleteItemParams>
}

export const useDeleteAirport = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterAirport.MASTER_AIRPORT_LIST],
    mutationFn: (params: MasterAirportDeleteItemParams) => apiServices.masterAirport.deleteItem({ params }),
    mutationOptions,
  })
}
