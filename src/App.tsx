import { useState } from 'react'
import { useList } from '../src/hooks/useList'
import { dummyDatas } from '../src/dummy'

interface List {
  id: string
  title: string
}

function App() {
  const { state, append, popleft, pop, remove } = useList<List>(dummyDatas)
  const [data, setData] = useState<string>('')

  return (
    <div style={{ padding: 40 }}>
      <input value={data} onChange={(e) => setData(e.target.value)} />
      <br />
      <br />
      <button
        onClick={() => {
          append({ id: new Date().toString(), title: data })
          setData('')
        }}
        style={{ marginRight: 16 }}
      >
        추가
      </button>
      <button onClick={popleft} style={{ marginRight: 16 }}>
        맨 처음 요소 삭제
      </button>
      <button onClick={pop} style={{ marginRight: 16 }}>
        맨 뒤에 요소 삭제
      </button>

      <ul>
        {state &&
          state.length > 0 &&
          state.map((item, index) => (
            <div style={{ marginBottom: 16 }}>
              <li key={index}>{item.title}</li>
              <button onClick={() => remove(index)}>삭제</button>
            </div>
          ))}
      </ul>
    </div>
  )
}

export default App
