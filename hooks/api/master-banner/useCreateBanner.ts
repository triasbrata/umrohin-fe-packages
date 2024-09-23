import { queryKeyMasterBanners } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import { BannerCreateItemBody, BannerCreateItemResponse } from '@apps/packages/services/master-banner'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<BannerCreateItemResponse, BannerCreateItemBody>
}

export const useCreateBanner = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.message,
    invalidateQueryKey: [queryKeyMasterBanners.MASTER_BANNER_LIST],
    mutationFn: (body: BannerCreateItemBody) => apiServices.masterBanner.createItem({ body }),
    mutationOptions,
  })
}
