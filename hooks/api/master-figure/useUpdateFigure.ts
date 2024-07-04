import { queryKeyMasterFigure } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  FigureUpdateItemBody,
  FigureUpdateItemParams,
  FigureUpdateItemResponse,
} from '@apps/packages/services/master-figure'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<FigureUpdateItemResponse, FigureUpdateItemBody>
}

type ParamsType = FigureUpdateItemParams & FigureUpdateItemBody

export const useUpdateFigure = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterFigure.MASTER_FIGURE_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterFigure.updateItem({ params, body })
    },
    mutationOptions,
  })
}
