import { queryKeyMitraPackage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  PackageDetailResponse,
  PackageUpdateImage,
  PackageUpdateItemBody,
  PackageUpdateItemParams,
} from '@apps/packages/services/mitra-package'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageDetailResponse, PackageUpdateItemBody>
}

type ParamsType = PackageUpdateItemParams & PackageUpdateItemBody & PackageUpdateImage

export const useUpdatePackage = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMitraPackage.MITRA_PACKAGE_DETAIL],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.mitraPackage.updateItem({ params, body })
    },
    mutationOptions,
  })
}
