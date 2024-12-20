import apiServices from '@apps/packages/services'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import {
  CSPenempatanUpdateItemBody,
  CSPenempatanUpdateItemParams,
  CSPenempatanUpdateItemResponse,
} from '@apps/packages/services/cs-penempatan'
import { queryKeyCSPenempatan } from '@apps/packages/lib/constants/queryKeyCSPenempatan'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CSPenempatanUpdateItemResponse, CSPenempatanUpdateItemBody>
}

type ParamsType = CSPenempatanUpdateItemParams & CSPenempatanUpdateItemBody

export const useUpdateCSPenempatan = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyCSPenempatan.CS_PENEMPATAN_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.CSPenempatan.updateItem({ params, body })
    },
    mutationOptions,
  })
}
