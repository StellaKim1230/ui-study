import { useCallback, useState } from 'react'

export const useList = <T>(initialValue: T[] = []) => {
  const [state, setState] = useState<T[]>(initialValue)

  // append 마지막에 요소 추가
  // pop 마지막 요소 제거
  // popleft 첫번째 요소 제거

  const append = useCallback(
    (item: T) => setState((prev) => [...prev, item]),
    [],
  )

  return {
    state,
    append,
  }
}
