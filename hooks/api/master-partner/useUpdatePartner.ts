import { queryKeyMasterPartner } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterPartnerUpdateItemBody,
  MasterPartnerUpdateItemParams,
  MasterPartnerUpdateItemResponse,
  MasterPartnerUpdateVerifItemBody,
} from '@apps/packages/services/master-partner'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterPartnerUpdateItemResponse, MasterPartnerUpdateItemBody>
}

type MutationVerifArgs = {
  mutationOptions?: BaseMutationOptions<MasterPartnerUpdateItemResponse, MasterPartnerUpdateVerifItemBody>
}

type ParamsType = MasterPartnerUpdateItemParams & MasterPartnerUpdateItemBody
type ParamsVerifType = MasterPartnerUpdateItemParams & MasterPartnerUpdateVerifItemBody

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

export const useUpdateVerifPartner = (args: MutationVerifArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterPartner.MASTER_PARTNER_LIST],
    mutationFn: (params: ParamsVerifType) => {
      const { id, ...body } = params
      return apiServices.masterPartner.updateVerifItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
