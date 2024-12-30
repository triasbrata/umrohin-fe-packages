import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import { queryKeyMasterFAQ } from '@apps/packages/lib/constants/queryKeyMasterFAQ'
import apiServices from '@apps/packages/services'
import { FAQUpdateItemBody, FAQUpdateItemParams, FAQUpdateItemResponse } from '@apps/packages/services/master-faq'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<FAQUpdateItemResponse, FAQUpdateItemBody>
}

type ParamsType = FAQUpdateItemParams & FAQUpdateItemBody

export const useUpdateFAQ = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: (res) => res.message,
    invalidateQueryKey: [queryKeyMasterFAQ.MASTER_FAQ_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterFAQ.updateItem({ params, body })
    },
    mutationOptions,
  })
}
