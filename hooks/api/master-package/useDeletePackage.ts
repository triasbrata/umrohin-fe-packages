import { queryKeyMasterPackage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { PackageDeleteItemParams, PackageDeleteItemResponse } from '@apps/packages/services/master-package'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageDeleteItemResponse, PackageDeleteItemParams>
}

export const useDeletePackage = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterPackage.MASTER_PACKAGE_LIST],
    mutationFn: (params: PackageDeleteItemParams) => apiServices.masterPackage.deleteItem({ params }),
    mutationOptions,
  })
}
