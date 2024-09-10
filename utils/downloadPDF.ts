import axios, { AxiosResponse } from 'axios'

export const downloadFilePDF = async (url: string, fileName: string) => {
  try {
    const response: AxiosResponse<any> = await axios({
      method: 'get',
      url: url,
      responseType: 'blob',
    })

    const blobUrl = window.URL.createObjectURL(new Blob([response.data]))

    const link = document.createElement('a')
    link.href = blobUrl
    link.setAttribute('download', fileName)

    document.body.appendChild(link)
    link.click()

    link.parentNode?.removeChild(link)
  } catch (error) {
    console.error('Error downloading the file:', error)
  }
}
