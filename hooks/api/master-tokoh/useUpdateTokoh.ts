import { queryKeyMasterTokoh } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  TokohUpdateItemBody,
  TokohUpdateItemParams,
  TokohUpdateItemResponse,
} from '@apps/packages/services/master-tokoh'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<TokohUpdateItemResponse, TokohUpdateItemBody>
}

type ParamsType = TokohUpdateItemParams & TokohUpdateItemBody

export const useUpdateTokoh = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterTokoh.MASTER_TOKOH_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterTokoh.updateItem({ params, body })
    },
    mutationOptions,
  })
}
