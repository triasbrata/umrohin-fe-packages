import { queryKeyMasterBanners } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import {
  BannerUpdateItemBody,
  BannerUpdateItemParams,
  BannerUpdateItemResponse,
} from '@apps/packages/services/master-banner'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<BannerUpdateItemResponse, BannerUpdateItemBody>
}

type ParamsType = BannerUpdateItemParams & BannerUpdateItemBody

export const useUpdateBanner = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: (res) => res.message,
    invalidateQueryKey: [queryKeyMasterBanners.MASTER_BANNER_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterBanner.updateItem({ params, body })
    },
    mutationOptions,
  })
}
