import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import { queryKeyMasterFAQ } from '@apps/packages/lib/constants/queryKeyMasterFAQ'
import apiServices from '@apps/packages/services'
import {
  FAQActivationItemBody,
  FAQActivationItemParams,
  FAQActivationItemResponse,
} from '@apps/packages/services/master-faq'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<FAQActivationItemResponse, FAQActivationItemBody>
}

type ParamsType = FAQActivationItemParams & FAQActivationItemBody

export const useActivateFAQ = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterFAQ.MASTER_FAQ_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterFAQ.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
