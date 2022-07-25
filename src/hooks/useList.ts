import { useState } from 'react'

interface Data {
  id: string
  title: string
}

export const useList = () => {
  const [datas, setDatas] = useState<Data[]>()

  return {
    datas,
    setDatas,
  }
}
