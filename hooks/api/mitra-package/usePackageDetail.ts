import { queryKeyMitraPackage } from '@apps/split/lib/constants'
import { PackageListItem } from '@apps/split/services/mitra-package'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'

type usePackageDetailConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<PackageListItem>
}

export const usePackageDetail = (opt?: usePackageDetailConfig) => {
  const { queryKey = [queryKeyMitraPackage.MITRA_PACKAGE_DETAIL], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: PackageListItem = queryClient.getQueryData(queryKey) ?? {
    id: '',
    airlines: [],
    departure_date: [],
    description: '',
    facilities: [],
    galleries: [],
    hotels: [],
    package_id: '',
    package_name: '',
    rooms: [],
    status: 0,
    thumbnail: [],
    tour_leaders: [],
    tour_locations: [],
    agency: {
      address: '',
      bank_code: '',
      bank_number: '',
      bank_owner_name: '',
      certificate_number: 0,
      certificate_year: 0,
      director_name: '',
      id: '',
      is_highlight: false,
      logo_url: '',
      banner_url: '',
      name: '',
      office_status: '',
      phone: '',
      reject_reason: '',
      status: 0,
      verification_status: 0,
    },
    thematic: {
      description: '',
      icon_url: '',
      id: '',
      is_highlight: false,
      status: 0,
      title: '',
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
