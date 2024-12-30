import apiServices from '@apps/packages/services'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import { queryKeyMasterFAQ } from '@apps/packages/lib/constants/queryKeyMasterFAQ'
import { FAQDeleteItemParams, FAQDeleteItemResponse } from '@apps/packages/services/master-faq'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<FAQDeleteItemResponse, FAQDeleteItemParams>
}

export const useDeleteFAQ = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterFAQ.MASTER_FAQ_LIST],
    mutationFn: (params: FAQDeleteItemParams) => apiServices.masterFAQ.deleteItem({ params }),
    mutationOptions,
  })
}
