import { queryKeyPackageHotelVendor } from '@apps/packages/lib/constants'
import { PackageHotelVendorListItem } from '@apps/packages/services/package-hotel-vendor'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type usePackageHotelVendorDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<PackageHotelVendorListItem>
}

export const usePackageHotelVendorDetail = (opt?: usePackageHotelVendorDetailConfig) => {
  const { queryKey = [queryKeyPackageHotelVendor.PACKAGE_HOTEL_VENDOR_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: PackageHotelVendorListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    provider_id: '',
    provider: {
      name: '',
    },
    name: '',
    city_id: '',
    city: {
      code: '',
      name: '',
    },
    stars: '',
    address: '',
    start_date: '',
    end_date: '',
    featured_image: '',
    images: [''],
    facilities: [''],
  }

  return useQuery<PackageHotelVendorListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    ...options,
  })
}
