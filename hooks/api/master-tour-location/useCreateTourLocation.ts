import { queryKeyMasterTourLocation } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterTourLocationCreateItemBody,
  MasterTourLocationCreateItemResponse,
} from '@apps/packages/services/master-tour-location'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterTourLocationCreateItemResponse, MasterTourLocationCreateItemBody>
}

export const useCreateTourLocation = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyMasterTourLocation.MASTER_TOUR_LOCATION_LIST],
    mutationFn: (body: MasterTourLocationCreateItemBody) => apiServices.masterTourLocation.createItem({ body }),
    mutationOptions,
  })
}
