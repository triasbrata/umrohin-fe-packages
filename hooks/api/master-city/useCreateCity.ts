import { queryKeyMasterCity } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { CityCreateItemBody, CityCreateItemResponse } from '@apps/packages/services/master-city'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CityCreateItemResponse, CityCreateItemBody>
}

export const useCreateCity = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyMasterCity.MASTER_CITY_LIST],
    mutationFn: (body: CityCreateItemBody) => apiServices.masterCity.createItem({ body }),
    mutationOptions,
  })
}
