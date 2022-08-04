import { useState } from 'react'

enum State {
  NONE = 'NONE',
  LOADING = 'LOADING',
  SUCCESSED = 'SUCCESSED',
  FAILED = 'FAILED',
}

export const useEffectList = <T>(initialValues: T[]) => {
  const [state, setState] = useState<State>()
  const [items, setItems] = useState<T[]>(initialValues)

  // 마지막에 요소 추가
  const handleItemAppend = async (callback: (...args: any) => Promise<T>) => {
    try {
      setState(State.LOADING)
      const items = await callback()
      setItems((old) => [...old, items])
      setState(State.SUCCESSED)
    } catch (e) {
      setState(State.FAILED)
    }
  }

  // 원하는 위치의 요소 제거
  const handleItemRemove = async (callback: (...args: any) => Promise<T>) => {
    try {
      setState(State.LOADING)
      const item = await callback()
      const findIndex = items.findIndex((i) => i === item)

      if (findIndex > -1) {
        const current = [...items]
        current.splice(findIndex, 1)
        setItems([...current])
        setState(State.SUCCESSED)
      }
    } catch (e) {
      setState(State.FAILED)
    }
  }

  // 첫번째 요소 제거
  const handleItemPopLeft = async (callback: (...args: any) => Promise<T>) => {
    try {
      setState(State.LOADING)
      await callback()
      const current = [...items]
      current.shift()
      setItems([...current])
      setState(State.SUCCESSED)
    } catch (e) {
      setState(State.FAILED)
    }
  }

  // 마지막 요소 제거
  const handleItemPop = async (callback: (...args: any) => Promise<T>) => {
    try {
      setState(State.LOADING)
      await callback()
      const current = [...items]
      current.pop()
      setItems([...current])
      setState(State.SUCCESSED)
    } catch (e) {
      setState(State.FAILED)
    }
  }

  // refetch
  const handleItemsRefetch = async (callback: (...args: any) => Promise<T>) => {
    try {
      setState(State.LOADING)
      const items = await callback()
      setItems((old) => [...old, items])
      setState(State.SUCCESSED)
    } catch (e) {
      setState(State.FAILED)
    }
  }

  // filter
  const handleItemFilter = async (callback: (...args: any) => Promise<T[]>) => {
    try {
      setState(State.LOADING)
      const items = await callback()
      setItems(items)
      setState(State.SUCCESSED)
    } catch (e) {
      setState(State.FAILED)
    }
  }

  const handleItemUpdate = async (callback: (...args: any) => Promise<T>) => {
    try {
      setState(State.LOADING)
      const item = await callback()
      const findIndex = items.findIndex((i) => i === item)

      const current = [...items]
      current.map((c, index) => (index === findIndex ? item : c))
      setItems([...current])

      setState(State.SUCCESSED)
    } catch (e) {
      setState(State.FAILED)
    }
  }

  const handler = {
    handleItemAppend,
    handleItemRemove,
    handleItemPopLeft,
    handleItemsRefetch,
    handleItemPop,
    handleItemFilter,
    handleItemUpdate,
  }

  return { state, items, handler }
}
