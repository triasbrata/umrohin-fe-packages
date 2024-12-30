import apiServices from '@apps/packages/services'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import { BenefitDeleteItemParams, BenefitDeleteItemResponse } from '@apps/packages/services/master-benefit'
import { queryKeyMasterBenefit } from '@apps/packages/lib/constants/queryKeyMasterBenefit'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<BenefitDeleteItemResponse, BenefitDeleteItemParams>
}

export const useDeleteBenefit = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterBenefit.MASTER_BENEFIT_LIST],
    mutationFn: (params: BenefitDeleteItemParams) => apiServices.masterBenefit.deleteItem({ params }),
    mutationOptions,
  })
}
