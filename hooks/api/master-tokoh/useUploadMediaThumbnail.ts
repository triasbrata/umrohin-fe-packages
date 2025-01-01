import apiServices from '@apps/packages/services'
import {
  TokohUploadMediaThumbnailItemBody,
  TokohUploadMediaThumbnailItemResponse,
} from '@apps/packages/services/master-tokoh'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<TokohUploadMediaThumbnailItemResponse, TokohUploadMediaThumbnailItemBody>
}

export const useUploadMediaThumbnail = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    errorMessage: (res) => res.message,
    mutationFn: (body: TokohUploadMediaThumbnailItemBody) =>
      apiServices.masterTokoh.tokohUploadMediaThumbnail({ body }),
    mutationOptions,
  })
}
