import { queryKeyMasterFigure } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { FigureCreateItemBody, FigureCreateItemResponse } from '@apps/packages/services/master-figure'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<FigureCreateItemResponse, FigureCreateItemBody>
}

export const useCreateFigure = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.message,
    invalidateQueryKey: [queryKeyMasterFigure.MASTER_FIGURE_LIST],
    mutationFn: (body: FigureCreateItemBody) => apiServices.masterFigure.createItem({ body }),
    mutationOptions,
  })
}
