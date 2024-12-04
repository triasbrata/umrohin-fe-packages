import { queryKeyMasterPackageHaji } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { PackageHajiDeleteItemParams, PackageHajiDeleteItemResponse } from '@apps/packages/services/master-package-haji'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageHajiDeleteItemResponse, PackageHajiDeleteItemParams>
}

export const useDeletePackageHaji = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterPackageHaji.MASTER_PACKAGE_HAJI_LIST],
    mutationFn: (params: PackageHajiDeleteItemParams) => apiServices.masterPackageHaji.deleteItem({ params }),
    mutationOptions,
  })
}
