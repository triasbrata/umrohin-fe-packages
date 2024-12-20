import apiServices from '@apps/packages/services'
import { CSPenempatanDeleteItemResponse, CSPenempatanDeleteItemParams } from '@apps/packages/services/cs-penempatan'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import { queryKeyCSPenempatan } from '@apps/packages/lib/constants/queryKeyCSPenempatan'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CSPenempatanDeleteItemResponse, CSPenempatanDeleteItemParams>
}

export const useDeleteCSPenempatan = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyCSPenempatan.CS_PENEMPATAN_LIST],
    mutationFn: (params: CSPenempatanDeleteItemParams) => apiServices.CSPenempatan.deleteCSPenempatan({ params }),
    mutationOptions,
  })
}
