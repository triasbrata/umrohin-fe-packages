import { queryKeyMasterBanners } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import { BannerDeleteItemParams, BannerDeleteItemResponse } from '@apps/packages/services/master-banner'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<BannerDeleteItemResponse, BannerDeleteItemParams>
}

export const useDeleteBanner = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterBanners.MASTER_BANNER_LIST],
    mutationFn: (params: BannerDeleteItemParams) => apiServices.masterBanner.deleteItem({ params }),
    mutationOptions,
  })
}
