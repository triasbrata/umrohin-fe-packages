import { queryKeyMasterAirlines } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  AirlinesUpdateItemBody,
  AirlinesUpdateItemParams,
  AirlinesUpdateItemResponse,
} from '@apps/packages/services/master-airlines'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<AirlinesUpdateItemResponse, AirlinesUpdateItemBody>
}

type ParamsType = AirlinesUpdateItemParams & AirlinesUpdateItemBody

export const useUpdateAirlines = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterAirlines.MASTER_AIRLINES_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterAirlines.updateItem({ params, body })
    },
    mutationOptions,
  })
}
