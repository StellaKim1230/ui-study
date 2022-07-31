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

  const handleRemoveItem = async (callback: (...args: any) => Promise<T>) => {
    try {
      setState(State.LOADING)
      const item = await callback()
      const findeIndex = items.findIndex((i) => i === item)

      if (findeIndex > -1) {
        const current = [...items]
        current.splice(findeIndex, 1)
        setItems([...current])
        setState(State.SUCCESSED)
      }
    } catch (e) {
      setState(State.FAILED)
    }
  }

  const handler = {
    handleItemAppend,
    handleRemoveItem,
    // pop,
    // popleft,
    // refetch,
  }

  return { state, items, handler }
}
