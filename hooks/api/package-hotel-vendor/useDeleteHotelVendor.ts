import { queryKeyPackageHotelVendor } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  PackageHotelVendorDeleteItemParams,
  PackageHotelVendorDeleteItemResponse,
} from '@apps/packages/services/package-hotel-vendor'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageHotelVendorDeleteItemResponse, PackageHotelVendorDeleteItemParams>
}

export const useDeleteHotelVendor = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyPackageHotelVendor.PACKAGE_HOTEL_VENDOR_LIST],
    mutationFn: (params: PackageHotelVendorDeleteItemParams) => apiServices.packageHotelVendor.deleteItem({ params }),
    mutationOptions,
  })
}
