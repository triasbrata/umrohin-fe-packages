import { queryKeyPackageHotelVendor } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  PackageHotelVendorUpdateItemBody,
  PackageHotelVendorUpdateItemParams,
  PackageHotelVendorUpdateItemResponse,
} from '@apps/packages/services/package-hotel-vendor'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageHotelVendorUpdateItemResponse, PackageHotelVendorUpdateItemBody>
}

type ParamsType = PackageHotelVendorUpdateItemParams & PackageHotelVendorUpdateItemBody

export const useUpdateHotelVendor = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyPackageHotelVendor.PACKAGE_HOTEL_VENDOR_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.packageHotelVendor.updateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
