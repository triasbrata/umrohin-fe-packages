import apiServices from '@apps/packages/services'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import { BenefitCreateItemBody, BenefitCreateItemResponse } from '@apps/packages/services/master-benefit'
import { queryKeyMasterBenefit } from '@apps/packages/lib/constants/queryKeyMasterBenefit'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<BenefitCreateItemResponse, BenefitCreateItemBody>
}

export const useCreateBenefit = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.message,
    invalidateQueryKey: [queryKeyMasterBenefit.MASTER_BENEFIT_LIST],
    mutationFn: (body: BenefitCreateItemBody) => apiServices.masterBenefit.createItem({ body }),
    mutationOptions,
  })
}
