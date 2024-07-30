import { queryKeyPackageHotelVendor } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  PackageHotelVendorCreateItemBody,
  PackageHotelVendorCreateItemResponse,
} from '@apps/packages/services/package-hotel-vendor'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageHotelVendorCreateItemResponse, PackageHotelVendorCreateItemBody>
}

export const useCreateHotelVendor = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: () => 'Data gagal ditambahkan',
    invalidateQueryKey: [queryKeyPackageHotelVendor.PACKAGE_HOTEL_VENDOR_LIST],
    mutationFn: (body: PackageHotelVendorCreateItemBody) => apiServices.packageHotelVendor.createItem({ body }),
    mutationOptions,
  })
}
