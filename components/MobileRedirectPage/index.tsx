'use client'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, type ReactNode } from 'react'

const MobileRedirectPage = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    const screenWidth = window.innerWidth
    if (screenWidth <= 360) {
      router.replace(`${process.env.NEXT_PUBLIC_MOBILE_URL ?? '/'}${pathname}`)
    }
  }, [router])
  return <>{children}</>
}

export default MobileRedirectPage
