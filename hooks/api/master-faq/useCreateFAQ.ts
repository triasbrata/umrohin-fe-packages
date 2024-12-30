import apiServices from '@apps/packages/services'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import { queryKeyMasterFAQ } from '@apps/packages/lib/constants/queryKeyMasterFAQ'
import { FAQCreateItemBody, FAQCreateItemResponse } from '@apps/packages/services/master-faq'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<FAQCreateItemResponse, FAQCreateItemBody>
}

export const useCreateFAQ = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.message,
    invalidateQueryKey: [queryKeyMasterFAQ.MASTER_FAQ_LIST],
    mutationFn: (body: FAQCreateItemBody) => apiServices.masterFAQ.createItem({ body }),
    mutationOptions,
  })
}
