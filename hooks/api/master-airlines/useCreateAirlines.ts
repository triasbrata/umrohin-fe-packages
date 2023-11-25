import { queryKeyMasterAirlines } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { AirlinesCreateItemBody, AirlinesCreateItemResponse } from '@apps/packages/services/master-airlines'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<AirlinesCreateItemResponse, AirlinesCreateItemBody>
}

export const useCreateAirlines = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyMasterAirlines.MASTER_AIRLINES_LIST],
    mutationFn: (body: AirlinesCreateItemBody) => apiServices.masterAirlines.createItem({ body }),
    mutationOptions,
  })
}
