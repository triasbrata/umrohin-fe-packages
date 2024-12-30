import {
  BenefitActivationItemBody,
  BenefitActivationItemParams,
  BenefitActivationItemResponse,
} from '@apps/packages/services/master-benefit'
import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import { queryKeyMasterBenefit } from '@apps/packages/lib/constants/queryKeyMasterBenefit'
import apiServices from '@apps/packages/services'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<BenefitActivationItemResponse, BenefitActivationItemBody>
}

type ParamsType = BenefitActivationItemParams & BenefitActivationItemBody

export const useActivateBenefit = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterBenefit.MASTER_BENEFIT_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterBenefit.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
