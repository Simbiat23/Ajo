

import { useState } from 'react'
import CircleForm from './components/CircleForm'
import type { CircleResponse } from './types/types'
import CircleCard from './components/CircleCard'

function App() {
  // Lifting state up: createdCircle lives here (not inside CircleForm) so both
// CircleForm and CircleCard can access it.
  const [createdCircle, setCreatedCircle] = useState<CircleResponse | null>(null)


 return (
    <div>
      <h1>ÀJỌ</h1>
      
      {createdCircle === null ? 
       <CircleForm onCircleCreated = {setCreatedCircle}/> :
       <CircleCard circle={createdCircle}/>}
    </div>
  )

 
}

export default App
