import { queryKeyMasterPackage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { PackageCreateItemBody, PackageCreateItemResponse } from '@apps/packages/services/master-package'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageCreateItemResponse, PackageCreateItemBody>
}

export const useCreatePackage = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.message,
    invalidateQueryKey: [queryKeyMasterPackage.MASTER_PACKAGE_LIST],
    mutationFn: (body: PackageCreateItemBody) => apiServices.masterPackage.createItem({ body }),
    mutationOptions,
  })
}
