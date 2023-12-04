import { queryKeyMitraPackage } from '@apps/packages/lib/constants'
import { PackageListItem } from '@apps/packages/services/mitra-package'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type usePackageDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<PackageListItem>
}

export const usePackageDetail = (opt?: usePackageDetailConfig) => {
  const { queryKey = [queryKeyMitraPackage.MITRA_PACKAGE_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: PackageListItem = queryClient.getQueryData(queryKey) ?? {
    package_id: '',
    name: '',
    is_package_plus: false,
    desc: '',
    status: false,
    is_highlight: false,
    agency: {
      agency_id: '',
      name: '',
      address: '',
      image: '',
      business_certificate_number: '',
      business_certificate_year: 0,
    },
    thematic: {
      thematic_id: '',
      name: '',
      desc: '',
      image: '',
    },
    package_schedules: [],
    package_destinations: [],
    package_prices: [],
    package_tour_leaders: [],
    package_hotels: [],
    package_facilities: [],
    package_airlines: [],
    package_images: {
      flyer: '',
      gallery: [],
    },
  }

  return useQuery<PackageListItem>({
    queryKey,
    queryFn: () => placeholderData,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...options,
  })
}
