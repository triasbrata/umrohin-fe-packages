import { queryKeyMitraAgency } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { AgencyDeleteItemParams, AgencyDeleteItemResponse } from '@apps/packages/services/mitra-agency'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<AgencyDeleteItemResponse, AgencyDeleteItemParams>
}

export const useDeleteTourLocation = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMitraAgency.MITRA_AGENCY_LIST],
    mutationFn: (params: AgencyDeleteItemParams) => apiServices.masterTourLocation.deleteItem({ params }),
    mutationOptions,
  })
}
