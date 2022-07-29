import { useCallback, useState } from 'react'

// server,, loading, error (side effect)

export const useList = <T>(initialValue: T[] = []) => {
  const [state, setState] = useState<T[]>(initialValue)

  // append 마지막에 요소 추가
  const append = useCallback(
    (item: T) => setState((prev) => [...prev, item]),
    [],
  )

  // popleft 첫번째 요소 제거
  const popleft = useCallback(() => {
    const current = [...state]
    current.shift()
    return setState([...current])
  }, [state])

  // pop 마지막 요소 제거
  const pop = useCallback(() => {
    const current = [...state]
    current.pop()
    return setState([...current])
  }, [state])

  // 원하는 index의 요소 제거
  const remove = useCallback(
    (index: number) => {
      const current = [...state]
      current.splice(index, 1)
      return setState([...current])
    },
    [state],
  )

  return {
    state,
    append,
    popleft,
    pop,
    remove,
  }
}
