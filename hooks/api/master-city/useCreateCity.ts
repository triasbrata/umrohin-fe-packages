import { queryKeyMasterCity } from '@apps/split/lib/constants'
import apiServices from '@apps/services'
import { CityCreateItemBody, CityCreateItemResponse } from '@apps/split/services/master-city'

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
