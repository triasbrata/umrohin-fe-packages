const handleInputPhoneNumber = (waNumber: string): string => {
  if (!waNumber) return ''

  let cleanNumber = waNumber?.replace(/[^0-9+]/g, '')

  if (cleanNumber.startsWith('+62')) {
    cleanNumber = cleanNumber?.slice(1)
  }

  if (cleanNumber?.startsWith('0')) {
    cleanNumber = '62' + cleanNumber?.slice(1)
  }

  return cleanNumber
}

export default handleInputPhoneNumber
