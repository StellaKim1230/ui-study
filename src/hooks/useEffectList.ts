import { useCallback, useState } from 'react'

// loading
// data
// error

type State = {
  loading: boolean
  data?: any
  error?: any
}

export const useEffectList = <T>(callback: (...args: any) => Promise<T>) => {
  const [state, setState] = useState<State>()

  const fetchData = async () => {
    try {
      const data = await callback()
      setState({ loading: false, data, error: null })
    } catch (e) {
      setState({ loading: false, data: null, error: e })
    }
  }

  const handler = {
    // append,
    // pop,
    // popleft,
    // remove,
    // refetch,
  }

  return { state, fetchData, handler }
}

// 맨 앞에 제거 후 추가 < 시간복잡도 : 선형시간 // 어떻게 해결할 것인가?? >
