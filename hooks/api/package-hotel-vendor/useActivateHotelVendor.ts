import { queryKeyPackageHotelVendor } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  PackageHotelVendorActivationItemBody,
  PackageHotelVendorActivationItemParams,
  PackageHotelVendorActivationItemResponse,
} from '@apps/packages/services/package-hotel-vendor'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageHotelVendorActivationItemResponse, PackageHotelVendorActivationItemBody>
}

type ParamsType = PackageHotelVendorActivationItemParams & PackageHotelVendorActivationItemBody

export const useActivateHotelVendor = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyPackageHotelVendor.PACKAGE_HOTEL_VENDOR_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.packageHotelVendor.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
