import { queryKeyMasterCity } from '@apps/packages/lib/constants'
import apiServices from '@apps/services'
import { CityDeleteItemParams, CityDeleteItemResponse } from '@apps/packages/services/master-city'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CityDeleteItemResponse, CityDeleteItemParams>
}

export const useDeleteCity = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterCity.MASTER_CITY_LIST],
    mutationFn: (params: CityDeleteItemParams) => apiServices.masterCity.deleteItem({ params }),
    mutationOptions,
  })
}
