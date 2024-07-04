import type { ThemeConfig } from 'antd'
import { Plus_Jakarta_Sans, Quicksand } from 'next/font/google'

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#EE204D',
    fontFamily: `${quicksand.style.fontFamily}, ${plusJakartaSans.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
  },
  components: {
    Table: {
      headerBg: '#F6F8FA',
      headerColor: '#4B5563',
    },
  },
}
