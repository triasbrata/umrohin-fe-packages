'use client'

import { Button, Form, Input, Typography } from 'antd'

import styles from './PasswordForm.module.css'

type Props = {
  title: string
  subtitle: string
  onSubmit: () => void
}

type FormType = {
  password: string
  confirm_password: string
}

export const PasswordForm = (props: Props) => {
  const { title, subtitle, onSubmit } = props

  const [form] = Form.useForm<FormType>()
  const watchPassword = Form.useWatch('password', form) ?? ''
  const watchConfirmPassword = Form.useWatch('confirm_password', form) ?? ''

  const isSubmitDisabled = !watchPassword || !watchConfirmPassword

  const handleSubmit = () => {
    onSubmit()
  }

  return (
    <div className="border border-[#E5E7EB] rounded-xl bg-white w-[480px] p-12">
      <Typography.Title level={1} className="text-xl text-center font-semibold m-0 mb-1">
        {title}
      </Typography.Title>
      <Typography.Paragraph className="text-sm text-center mb-6">{subtitle}</Typography.Paragraph>
      <Form form={form} layout="vertical" className={styles.passwordForm} onFinish={handleSubmit}>
        <Form.Item<FormType>
          label={<Typography.Text className="font-semibold">Kata Sandi Baru</Typography.Text>}
          name="password"
          rules={[
            {
              required: true,
              message: 'Kata sandi baru tidak boleh kosong',
            },
            {
              type: 'string',
              min: 8,
              message: 'Kata sandi minimal 8 karakter',
            },
          ]}
          className="mb-6"
        >
          <Input.Password placeholder="Masukkan kata sandi" className="rounded-md h-12" />
        </Form.Item>
        <Form.Item<FormType>
          label={<Typography.Text className="font-semibold">Konfirmasi Kata Sandi</Typography.Text>}
          name="confirm_password"
          rules={[
            {
              required: true,
              message: 'Konfirmasi kata sandi tidak boleh kosong',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Kata sandi tidak sama'))
              },
            }),
          ]}
          className="mb-6"
        >
          <Input.Password placeholder="Masukkan ulang kata sandi" className="rounded-md h-12" />
        </Form.Item>
        <Button
          type="primary"
          disabled={isSubmitDisabled}
          htmlType="submit"
          className="flex items-center justify-center rounded-lg text-base font-semibold h-10 w-full px-4"
        >
          Simpan
        </Button>
      </Form>
    </div>
  )
}
