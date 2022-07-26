import React from 'react'
import { useList } from '../src/hooks/useList'
import { dummyDatas } from '../src/dummy'

function App() {
  const { datas } = useList(dummyDatas)

  return (
    <div>
      <ul>
        {datas &&
          datas.length > 0 &&
          datas.map((data) => <li key={data.id}>{data.title}</li>)}
      </ul>
    </div>
  )
}

export default App
