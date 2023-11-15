import { queryKeyMasterFacility } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { MasterFacilityCreateItemBody, MasterFacilityCreateItemResponse } from '@apps/packages/services/master-facility'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterFacilityCreateItemResponse, MasterFacilityCreateItemBody>
}

export const useCreateFacility = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyMasterFacility.MASTER_FACILITY_LIST],
    mutationFn: (body: MasterFacilityCreateItemBody) => apiServices.masterFacility.createItem({ body }),
    mutationOptions,
  })
}
