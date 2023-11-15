import { queryKeyMasterAirport } from '@apps/split/lib/constants'
import apiServices from '@apps/services'
import { MasterAirportCreateItemBody, MasterAirportCreateItemResponse } from '@apps/split/services/master-airport'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterAirportCreateItemResponse, MasterAirportCreateItemBody>
}

export const useCreateAirport = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyMasterAirport.MASTER_AIRPORT_LIST],
    mutationFn: (body: MasterAirportCreateItemBody) => apiServices.masterAirport.createItem({ body }),
    mutationOptions,
  })
}
