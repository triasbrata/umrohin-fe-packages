import apiServices from '@apps/packages/services'
import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import { CSPenempatanCreateItemBody, CSPenempatanCreateItemResponse } from '@apps/packages/services/cs-penempatan'
import { queryKeyCSPenempatan } from '@apps/packages/lib/constants/queryKeyCSPenempatan'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CSPenempatanCreateItemResponse, CSPenempatanCreateItemBody>
}

export const useCreateCSPenempatan = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.message,
    invalidateQueryKey: [queryKeyCSPenempatan.CS_PENEMPATAN_LIST],
    mutationFn: (body: CSPenempatanCreateItemBody) => apiServices.CSPenempatan.createCSPenempatanItem({ body }),
    mutationOptions,
  })
}
