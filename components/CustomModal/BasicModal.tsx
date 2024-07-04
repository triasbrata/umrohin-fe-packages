'use client'

import { Modal, Typography, Row, Col, Button, ButtonProps } from 'antd'
import clsx from 'clsx'

type Props = {
  isVisible: boolean
  title?: string
  description?: string
  cancelButtonProps?: ButtonProps & { text?: string }
  submitButtonProps?: ButtonProps & { text?: string }
  children?: React.ReactNode
}

export const BasicModal = (props: Props) => {
  const {
    isVisible,
    title = 'Title of Modal',
    description = 'Description of Modal',
    cancelButtonProps,
    submitButtonProps,
    children,
  } = props

  const { text: cancelText = 'Batal', onClick: onCancel = () => null } = cancelButtonProps ?? {}
  const { text: submitText = 'Submit', onClick: onSubmit = () => null } = submitButtonProps ?? {}

  return (
    <Modal
      open={isVisible}
      centered
      closable={false}
      closeIcon={null}
      width={328}
      footer={null}
      classNames={{ content: 'py-9 px-6' }}
      onCancel={onCancel}
    >
      <Typography.Title level={5} className="text-base text-center m-0">
        {title}
      </Typography.Title>
      <Typography.Paragraph className="text-xs text-text-low text-center m-0 mt-1">{description}</Typography.Paragraph>
      {children}
      <Row gutter={16} className="items-center justify-center mt-6">
        <Col span={12}>
          <Button
            block
            onClick={onCancel}
            {...cancelButtonProps}
            className={clsx(
              'flex items-center justify-center rounded-lg text-base font-semibold h-10',
              cancelButtonProps?.className
            )}
          >
            {cancelText}
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            block
            onClick={onSubmit}
            {...submitButtonProps}
            className={clsx(
              'flex items-center justify-center rounded-lg text-base font-semibold h-10',
              submitButtonProps?.className
            )}
          >
            {submitText}
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}
