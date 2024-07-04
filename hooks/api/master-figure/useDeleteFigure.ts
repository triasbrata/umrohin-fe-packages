import { queryKeyMasterFigure } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { FigureDeleteItemParams, FigureDeleteItemResponse } from '@apps/packages/services/master-figure'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<FigureDeleteItemResponse, FigureDeleteItemParams>
}

export const useDeleteFigure = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterFigure.MASTER_FIGURE_LIST],
    mutationFn: (params: FigureDeleteItemParams) => apiServices.masterFigure.deleteItem({ params }),
    mutationOptions,
  })
}
