import { queryKeyMasterFacility } from '@apps/split/lib/constants'
import apiServices from '@apps/services'
import {
  MasterFacilityUpdateItemBody,
  MasterFacilityUpdateItemParams,
  MasterFacilityUpdateItemResponse,
} from '@apps/split/services/master-facility'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterFacilityUpdateItemResponse, MasterFacilityUpdateItemBody>
}

type ParamsType = MasterFacilityUpdateItemParams & MasterFacilityUpdateItemBody

export const useUpdateFacility = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterFacility.MASTER_FACILITY_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterFacility.updateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
