import { queryKeyMasterPartner } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { MasterPartnerDeleteItemParams, MasterPartnerDeleteItemResponse } from '@apps/packages/services/master-partner'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterPartnerDeleteItemResponse, MasterPartnerDeleteItemParams>
}

export const useDeletePartner = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterPartner.MASTER_PARTNER_LIST],
    mutationFn: (params: MasterPartnerDeleteItemParams) => apiServices.masterPartner.deleteItem({ params }),
    mutationOptions,
  })
}
