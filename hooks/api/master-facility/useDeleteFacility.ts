import { queryKeyMasterFacility } from '@apps/split/lib/constants'
import apiServices from '@apps/services'
import { MasterFacilityDeleteItemParams, MasterFacilityDeleteItemResponse } from '@apps/split/services/master-facility'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterFacilityDeleteItemResponse, MasterFacilityDeleteItemParams>
}

export const useDeleteFacility = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterFacility.MASTER_FACILITY_LIST],
    mutationFn: (params: MasterFacilityDeleteItemParams) => apiServices.masterFacility.deleteItem({ params }),
    mutationOptions,
  })
}
