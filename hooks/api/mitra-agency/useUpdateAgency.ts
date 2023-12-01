import { queryKeyMitraAgency } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  AgencyUpdateItemBody,
  AgencyUpdateItemParams,
  AgencyUpdateItemResponse,
} from '@apps/packages/services/mitra-agency'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<AgencyUpdateItemResponse, AgencyUpdateItemBody>
}

type ParamsType = AgencyUpdateItemParams & AgencyUpdateItemBody

export const useUpdateAgency = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMitraAgency.MITRA_AGENCY_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.mitraAgency.updateItem({ params, body })
    },
    mutationOptions,
  })
}
