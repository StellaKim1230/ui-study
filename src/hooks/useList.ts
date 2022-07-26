import { useState } from 'react'
import { ListItem } from '../types/ListItem'

export const useList = (lists: ListItem[]) => {
  const [datas, setDatas] = useState<ListItem[]>(lists)

  return {
    datas,
    setDatas,
  }
}
