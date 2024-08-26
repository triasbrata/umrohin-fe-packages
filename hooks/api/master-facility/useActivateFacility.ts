import { queryKeyMasterFacility } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterFacilityActivationItemBody,
  MasterFacilityActivationItemParams,
  MasterFacilityActivationItemResponse,
} from '@apps/packages/services/master-facility'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterFacilityActivationItemResponse, MasterFacilityActivationItemBody>
}

type ParamsType = MasterFacilityActivationItemParams & MasterFacilityActivationItemBody

export const useActivateFacility = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterFacility.MASTER_FACILITY_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterFacility.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
