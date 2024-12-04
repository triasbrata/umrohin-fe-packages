import { queryKeyMasterPackageHaji } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { PackageHajiCreateItemBody, PackageHajiCreateItemResponse } from '@apps/packages/services/master-package-haji'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageHajiCreateItemResponse, PackageHajiCreateItemBody>
}

export const useCreatePackageHaji = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.message,
    invalidateQueryKey: [queryKeyMasterPackageHaji.MASTER_PACKAGE_HAJI_LIST],
    mutationFn: (body: PackageHajiCreateItemBody) => apiServices.masterPackageHaji.createItem({ body }),
    mutationOptions,
  })
}
