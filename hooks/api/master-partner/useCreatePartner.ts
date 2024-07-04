import { queryKeyMasterPartner } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { MasterPartnerCreateItemBody, MasterPartnerCreateItemResponse } from '@apps/packages/services/master-partner'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterPartnerCreateItemResponse, MasterPartnerCreateItemBody>
}

export const useCreatePartner = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyMasterPartner.MASTER_PARTNER_LIST],
    mutationFn: (body: MasterPartnerCreateItemBody) => apiServices.masterPartner.createItem({ body }),
    mutationOptions,
  })
}
