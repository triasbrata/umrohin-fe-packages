import {
  BenefitUpdateItemBody,
  BenefitUpdateItemParams,
  BenefitUpdateItemResponse,
} from '@apps/packages/services/master-benefit'
import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import { queryKeyMasterBenefit } from '@apps/packages/lib/constants/queryKeyMasterBenefit'
import apiServices from '@apps/packages/services'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<BenefitUpdateItemResponse, BenefitUpdateItemBody>
}

type ParamsType = BenefitUpdateItemParams & BenefitUpdateItemBody

export const useUpdateBenefit = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: (res) => res.message,
    invalidateQueryKey: [queryKeyMasterBenefit.MASTER_BENEFIT_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterBenefit.updateItem({ params, body })
    },
    mutationOptions,
  })
}
