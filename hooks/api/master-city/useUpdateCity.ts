import { queryKeyMasterCity } from '@apps/packages/lib/constants'
import apiServices from '@apps/services'
import { CityUpdateItemBody, CityUpdateItemParams, CityUpdateItemResponse } from '@apps/packages/services/master-city'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CityUpdateItemResponse, CityUpdateItemBody>
}

type ParamsType = CityUpdateItemParams & CityUpdateItemBody

export const useUpdateCity = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterCity.MASTER_CITY_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterCity.updateItem({ params, body })
    },
    mutationOptions,
  })
}
