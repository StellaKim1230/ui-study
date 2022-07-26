import React from 'react'
import { useList } from '../src/hooks/useList'
import { dummyDatas } from '../src/dummy'

interface List {
  id: string
  title: string
}

function App() {
  const { state, append, popleft, pop, remove } = useList<List>(dummyDatas)
  console.log('state', state)

  return (
    <div>
      <button onClick={() => append({ id: 'test', title: 'title' })}>
        append
      </button>
      <button onClick={() => popleft()}>popleft</button>
      <button onClick={() => pop()}>pop</button>
      <button onClick={() => remove(2)}>remove</button>

      <ul>
        {state &&
          state.length > 0 &&
          state.map((item, index) => <li key={index}>{item.title}</li>)}
      </ul>
    </div>
  )
}

export default App
