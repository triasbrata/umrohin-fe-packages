export const dateFormatter = (
  value?: string | number,
  options?: Intl.DateTimeFormatOptions,
  hasTime = false,
  optionTime: Intl.DateTimeFormatOptions = {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  },
  timezone = 'id-ID'
) => {
  if (!value) return
  const date = new Date(value)
  const dateString = date.toLocaleDateString(timezone, options)
  const timeString = date.toLocaleTimeString(timezone, optionTime)
  const formattedDateTime = `${dateString} ${hasTime ? timeString : ''}`
  return formattedDateTime
}
