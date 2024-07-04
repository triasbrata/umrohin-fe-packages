import { queryKeyMasterPartner } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterPartnerUpdateItemBody,
  MasterPartnerUpdateItemParams,
  MasterPartnerUpdateItemResponse,
} from '@apps/packages/services/master-partner'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterPartnerUpdateItemResponse, MasterPartnerUpdateItemBody>
}

type ParamsType = MasterPartnerUpdateItemParams & MasterPartnerUpdateItemBody

export const useUpdatePartner = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterPartner.MASTER_PARTNER_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterPartner.updateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
