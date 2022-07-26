import React from 'react'
import { useList } from '../src/hooks/useList'
import { dummyDatas } from '../src/dummy'

function App() {
  const { state, append } = useList(dummyDatas)
  console.log('state', state)

  return (
    <div>
      <button onClick={() => append({ id: 'test', title: 'title' })}>
        append
      </button>
    </div>
  )
}

export default App
