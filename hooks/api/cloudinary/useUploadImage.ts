import { queryKeyCloudinary } from '@apps/split/lib/constants'
import { UploadImageParams, UploadImageResponse, uploadImage } from '@apps/split/services/cloudinary'
import { QueryKey, UseMutationOptions, useMutation } from '@tanstack/react-query'

type useUploadImageConfig = {
  mutationKey?: QueryKey
  options?: UseMutationOptions<UploadImageResponse, UploadImageParams, unknown>
}

export const useUploadImage = (opt: useUploadImageConfig) => {
  const { mutationKey = [queryKeyCloudinary.UPLOAD_IMAGE], options } = opt

  return useMutation({
    mutationKey,
    mutationFn: (params: UploadImageParams) => uploadImage({ file: params.file }),
    onSuccess: (res, variables, context) => {
      options?.onSuccess?.(res, variables, context)
    },
  })
}
