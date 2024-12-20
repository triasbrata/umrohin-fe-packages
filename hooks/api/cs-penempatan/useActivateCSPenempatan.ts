import apiServices from '@apps/packages/services'

import {
  CSPenempatanActivationItemBody,
  CSPenempatanActivationItemParams,
  CSPenempatanActivationItemResponse,
} from '@apps/packages/services/cs-penempatan'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import { queryKeyCSPenempatan } from '@apps/packages/lib/constants/queryKeyCSPenempatan'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CSPenempatanActivationItemResponse, CSPenempatanActivationItemBody>
}

type ParamsType = CSPenempatanActivationItemParams & CSPenempatanActivationItemBody

export const useActivateCSPenempatan = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyCSPenempatan.CS_PENEMPATAN_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.CSPenempatan.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
