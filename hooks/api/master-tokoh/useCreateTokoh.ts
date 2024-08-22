import apiServices from '@apps/packages/services'
import { TokohCreateItemBody, TokohCreateItemResponse } from '@apps/packages/services/master-tokoh'

import { queryKeyMasterTokoh } from '@apps/packages/lib/constants/queryKeyMasterTokoh'
import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<TokohCreateItemResponse, TokohCreateItemBody>
}

export const useCreateTokoh = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.message,
    invalidateQueryKey: [queryKeyMasterTokoh.MASTER_TOKOH_LIST],
    mutationFn: (body: TokohCreateItemBody) => apiServices.masterTokoh.createTokohItem({ body }),
    mutationOptions,
  })
}
