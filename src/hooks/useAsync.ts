import { useReducer, useEffect } from 'react'

type State = {
  loading: boolean
  data: any
  error: any
}

type Action = {
  type: string
  data?: any
  error?: any
}

// reducer: 현재 상태와 액션 객체를 파라미터로 받아와서 새운 상태로 반환해주는 함수.
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      }
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      }
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const useAsync = <T>(
  callback: (...args: any) => Promise<T>,
  deps = [],
) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false,
  })

  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    try {
      const data = await callback()
      dispatch({ type: 'SUCCESS', data })
    } catch (e) {
      dispatch({ type: 'ERROR', error: e })
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, deps)

  return [state, fetchData]
}
