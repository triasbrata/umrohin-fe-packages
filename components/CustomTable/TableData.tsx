'use client'

import { Pagination, PaginationProps, Table, TableProps } from 'antd'
import { NavArrowLeft, NavArrowRight } from 'iconoir-react'

import styles from './TableData.module.css'

type Props = {
  tableProps: TableProps<any>
  paginationProps: PaginationProps
}

export const TableData = (props: Props) => {
  const { tableProps, paginationProps } = props

  return (
    <div className="relative">
      <div className="px-8">
        <Table
          rowClassName="align-top"
          {...tableProps}
          scroll={{ y: 'calc(100vh - 400px)', ...tableProps.scroll }}
          pagination={false}
        />
      </div>
      <div className="absolute right-0 bottom-0 left-0">
        <div
          className="fixed bottom-0 right-0 flex justify-end border-t border-t-[#E5E7EB] bg-white py-3 px-6"
          style={{ width: 'calc(100% - 288px)' }}
        >
          <Pagination
            showTotal={(total, range) => `Menampilkan ${range[0]} hingga ${range[1]} dari ${total} hasil`}
            defaultPageSize={10}
            defaultCurrent={1}
            showSizeChanger={false}
            prevIcon={<NavArrowLeft />}
            nextIcon={<NavArrowRight />}
            className={styles.tablePagination}
            {...paginationProps}
          />
        </div>
      </div>
    </div>
  )
}
