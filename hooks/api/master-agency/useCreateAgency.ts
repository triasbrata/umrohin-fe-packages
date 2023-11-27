import { queryKeyMasterAgency } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { AgencyCreateItemBody, AgencyCreateItemResponse } from '@apps/packages/services/master-agency'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<AgencyCreateItemResponse, AgencyCreateItemBody>
}

export const useCreateAgency = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyMasterAgency.MASTER_AGENCY_LIST],
    mutationFn: (body: AgencyCreateItemBody) => apiServices.masterAgency.createItem({ body }),
    mutationOptions,
  })
}
