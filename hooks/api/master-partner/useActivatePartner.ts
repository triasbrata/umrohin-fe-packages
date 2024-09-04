import { queryKeyMasterPartner } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterPartnerActivationItemBody,
  MasterPartnerActivationItemParams,
  MasterPartnerActivationItemResponse,
} from '@apps/packages/services/master-partner'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterPartnerActivationItemResponse, MasterPartnerActivationItemBody>
}

type ParamsType = MasterPartnerActivationItemParams & MasterPartnerActivationItemBody

export const useActivatePartner = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterPartner.MASTER_PARTNER_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterPartner.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
