'use client'

import { Button, Col, Dropdown, Layout, Row, Space, Typography } from 'antd'
import { BellNotification, LogOut, PasswordPass } from 'iconoir-react'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next13-progressbar'
import { BiSolidUser } from 'react-icons/bi'

export const HeaderNav = () => {
  const router = useRouter()

  const { data: session } = useSession()

  return (
    <Layout.Header className="border-b border-b-[#E5E7EB] bg-white leading-none h-[72px] p-4 pr-12">
      <Row gutter={16} className="items-center justify-end">
        <Col>
          <Button type="text" shape="circle" className="flex items-center justify-center h-10 w-10 overflow-hidden">
            <BellNotification />
          </Button>
        </Col>
        <Col>
          <Dropdown
            placement="bottomRight"
            overlayClassName="min-w-[180px]"
            dropdownRender={(menu) => (
              <div className="border border-[#E5E7EB] rounded-lg bg-white py-3 px-2">
                <Row className="flex-nowrap items-center gap-3">
                  <Col>
                    <div className="flex items-end justify-center rounded-lg bg-[#F6F8FA] h-10 w-10">
                      <BiSolidUser className="text-[#EE204D] h-[30px] w-[30px]" />
                    </div>
                  </Col>
                  <Col>
                    <Typography.Paragraph className="text-sm font-semibold mb-1">
                      {session?.user.userName}
                    </Typography.Paragraph>
                    <Typography.Paragraph className="text-xs text-[#4B5563] font-semibold m-0">
                      {session?.user.userEmail}
                    </Typography.Paragraph>
                  </Col>
                </Row>
                <Space direction="vertical" size={10} className="w-full mt-[10px]">
                  <Button
                    type="text"
                    icon={<PasswordPass height={16} width={16} />}
                    className="flex items-center rounded-lg text-xs font-semibold h-8 w-full"
                    onClick={() => router.push('/reset-password')}
                  >
                    Ubah Kata Sandi
                  </Button>
                  <div className="border-t border-t-[#E5E7EB]" />
                  <Button
                    type="text"
                    icon={<LogOut height={16} width={16} />}
                    className="flex items-center rounded-lg text-xs font-semibold h-8 w-full"
                    onClick={() => signOut()}
                  >
                    Keluar
                  </Button>
                </Space>
              </div>
            )}
          >
            <Button type="text" shape="circle" className="border border-[#E5E7EB] h-10 w-10 overflow-hidden">
              <Image
                src={require('@apps/public/umrohin-logo.png')}
                alt="Umroh.in"
                priority
                className="object-contain"
              />
            </Button>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  )
}
