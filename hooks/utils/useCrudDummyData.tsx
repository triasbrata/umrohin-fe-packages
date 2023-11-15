import { useAntdContextHolder } from '@apps/packages/lib/context'
import { QueryKey, useQueryClient } from '@tanstack/react-query'
import { Button, Typography } from 'antd'
import { Cancel, CheckCircle } from 'iconoir-react'

type SetSelectedDataType = {
  queryKey: QueryKey
  payload: unknown
  callback: () => void
}

type ResetSelectedDataType = {
  queryKey: QueryKey
  callback: () => void
}

type CreateItemType<T> = {
  queryKey: QueryKey
  payload: T
  callback: () => void
}

type UpdateItemType<T> = {
  queryKey: QueryKey
  payload: T
  callback: () => void
}

type ActivationItemType = {
  queryKey: QueryKey
  payload: {
    id: string
    status: 0 | 1 | 2
  }
  callback: () => void
}

type VerificationItemType<T> = {
  queryKey: QueryKey
  payload: T
  callback: () => void
}

type DeleteItemType = {
  queryKey: QueryKey
  id: string
  callback: () => void
}

type HighlightItemType = {
  queryKey: QueryKey
  payload: {
    id: string
    is_highlight: boolean
    max_highlight: number
  }
  callback: () => void
}

export const useCrudDummyData = () => {
  const queryClient = useQueryClient()
  const { antdNotification, antdModal } = useAntdContextHolder()

  const getSelectedData = <T,>(queryKey: QueryKey) => {
    return queryClient.getQueryData<T>(queryKey)
  }

  const onSetSelectedData = ({ queryKey, payload, callback }: SetSelectedDataType) => {
    queryClient.setQueryData(queryKey, payload)
    callback()
  }

  const onResetSelectedData = ({ queryKey, callback }: ResetSelectedDataType) => {
    queryClient.setQueryData(queryKey, null)
    callback()
  }

  const onCreateItem = <T,>({ queryKey, payload, callback }: CreateItemType<T>) => {
    const currDataSource = queryClient.getQueryData<T[]>(queryKey) ?? []
    const newDataSource = [payload, ...currDataSource]
    queryClient.setQueryData(queryKey, newDataSource)
    callback()
    antdNotification?.success({
      message: 'Data berhasil ditambahkan',
      icon: <CheckCircle color="#10B981" height={24} width={24} />,
      closeIcon: <Cancel height={24} width={24} />,
      className: 'custom-antd-notification',
    })
  }

  const onEditItem = <T extends { id: string }>({ queryKey, payload, callback }: UpdateItemType<T>) => {
    const currDataSource = queryClient.getQueryData<T[]>(queryKey) ?? []
    const findIndex = currDataSource.findIndex((data) => data.id === payload.id)
    if (findIndex < 0) return
    const newDataSource = [...currDataSource]
    newDataSource[findIndex] = payload
    queryClient.setQueryData(queryKey, newDataSource)
    callback()
    antdNotification?.success({
      message: 'Data berhasil diubah',
      icon: <CheckCircle color="#10B981" height={24} width={24} />,
      closeIcon: <Cancel height={24} width={24} />,
      className: 'custom-antd-notification',
    })
  }

  const onActivationItem = ({ queryKey, payload, callback }: ActivationItemType) => {
    const currDataSource = queryClient.getQueryData<any[]>(queryKey) ?? []
    const findIndex = currDataSource.findIndex((data) => data.id === payload.id)
    if (findIndex < 0) return
    const newDataSource = [...currDataSource]
    newDataSource[findIndex] = {
      ...newDataSource[findIndex],
      status: payload.status,
    }
    queryClient.setQueryData(queryKey, newDataSource)
    callback()
    const message = payload.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan'
    antdNotification?.success({
      message,
      icon: <CheckCircle color="#10B981" height={24} width={24} />,
      closeIcon: <Cancel height={24} width={24} />,
      className: 'custom-antd-notification',
    })
  }

  const onVerificationItem = <T extends { id: string; verification_status: 0 | 1 | 2 }>({
    queryKey,
    payload,
    callback,
  }: VerificationItemType<T>) => {
    const currDataSource = queryClient.getQueryData<any[]>(queryKey) ?? []
    const findIndex = currDataSource.findIndex((data) => data.id === payload.id)
    if (findIndex < 0) return
    const newDataSource = [...currDataSource]
    newDataSource[findIndex] = payload
    queryClient.setQueryData(queryKey, newDataSource)
    callback()
    const message = payload.verification_status !== 2 ? 'Data berhasil diverifikasi' : 'Data berhasil di-disverifikasi'
    antdNotification?.success({
      message,
      icon: <CheckCircle color="#10B981" height={24} width={24} />,
      closeIcon: <Cancel height={24} width={24} />,
      className: 'custom-antd-notification',
    })
  }

  const onHighlightItem = ({ queryKey, payload, callback }: HighlightItemType) => {
    const currDataSource = queryClient.getQueryData<any[]>(queryKey) ?? []
    const findIndex = currDataSource.findIndex((data) => data.id === payload.id)
    if (findIndex < 0) return
    const newDataSource = [...currDataSource]
    const filterHighlighted = newDataSource.filter((item) => item.is_highlight)
    if (payload.is_highlight && filterHighlighted.length === payload.max_highlight) {
      const modal = antdModal?.info({})
      modal?.update({
        icon: null,
        width: 328,
        centered: true,
        content: (
          <Typography.Paragraph className="text-base text-center font-semibold mb-6 mt-1">
            Jumlah data yang di-highlight sudah mencapai batas maksimal
          </Typography.Paragraph>
        ),
        footer: (
          <Button type="primary" block className="rounded-lg h-10 mx-auto mb-1" onClick={() => modal.destroy()}>
            Ok
          </Button>
        ),
        onCancel: () => modal.destroy(),
      })
      return
    }
    newDataSource[findIndex] = {
      ...newDataSource[findIndex],
      is_highlight: payload.is_highlight,
    }
    queryClient.setQueryData(queryKey, newDataSource)
    callback()
  }

  const onDeleteItem = ({ queryKey, id, callback }: DeleteItemType) => {
    const currDataSource = queryClient.getQueryData<any[]>(queryKey) ?? []
    const findIndex = currDataSource.findIndex((data) => data.id === id)
    if (findIndex < 0) return
    const newDataSource = [...currDataSource]
    newDataSource.splice(findIndex, 1)
    queryClient.setQueryData(queryKey, newDataSource)
    callback()
    antdNotification?.success({
      message: 'Data berhasil dihapus',
      icon: <CheckCircle color="#10B981" height={24} width={24} />,
      closeIcon: <Cancel height={24} width={24} />,
      className: 'custom-antd-notification',
    })
  }

  return {
    getSelectedData,
    onSetSelectedData,
    onResetSelectedData,
    onCreateItem,
    onEditItem,
    onActivationItem,
    onVerificationItem,
    onHighlightItem,
    onDeleteItem,
  }
}
