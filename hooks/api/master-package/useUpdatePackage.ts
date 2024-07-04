import { queryKeyMasterPackage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  PackageUpdateItemBody,
  PackageUpdateItemParams,
  PackageUpdateItemResponse,
} from '@apps/packages/services/master-package'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageUpdateItemResponse, PackageUpdateItemBody>
}

type ParamsType = PackageUpdateItemParams & PackageUpdateItemBody

export const useUpdatePackage = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterPackage.MASTER_PACKAGE_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterPackage.updateItem({ params, body })
    },
    mutationOptions,
  })
}
