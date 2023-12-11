import { queryKeyMitraPackage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { PackageCreateItemBody, PackageDetailResponse } from '@apps/packages/services/mitra-package'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageDetailResponse, PackageCreateItemBody>
}

export const useCreatePackage = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyMitraPackage.MITRA_PACKAGE_LIST],
    mutationFn: (body: PackageCreateItemBody) => apiServices.mitraPackage.createItem({ body }),
    mutationOptions,
  })
}
