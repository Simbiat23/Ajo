
import { useState } from 'react'
import CircleForm from './components/CircleForm'
import type { CircleResponse } from './types/types'
import CircleCard from './components/CircleCard'
import CircleList from './components/CircleList'
import { Button, Container, Heading, HStack } from '@chakra-ui/react'

type Page = 'home' | 'create' | 'detail'| 'edit';
function App() {
  // Lifting state up: createdCircle lives here (not inside CircleForm) so both
// CircleForm and CircleCard can access it.
  const [createdCircle, setCreatedCircle] = useState<CircleResponse | null>(null)
  const [page, setPage] = useState<Page>('home') 

// a small helper function that containers switch case to use to call inside the JSX
  function renderPage() {
    switch(page) {
      case 'home':
        return <CircleList onClickedCard={(circle) => 
          {setCreatedCircle(circle)
            setPage('detail')}}/>
      case 'create':
        return <CircleForm onCircleCreated={(circle) => {
          setCreatedCircle(circle)
          setPage('detail')
        }}/>
      case 'detail':
        if (createdCircle !== null) {
          return <CircleCard isDetailPage ={true} circle={createdCircle} onClickButton={() =>
            setPage('edit')
          }/>
        }
      case 'edit':
        if (createdCircle !== null) {
          return <CircleForm existingCircle={createdCircle} onCircleCreated={(circle) => {
            setCreatedCircle(circle)
            setPage('detail')
          }}/>

        }
        

        
    }
  }


 return (
    <Container maxWidth="600px">
      <HStack justifyContent="space-between">
        <Heading onClick={() => setPage('home')}>ÀJỌ</Heading>
        <Button onClick={() => setPage('create')}>New Circle</Button>
      </HStack>
      {renderPage()}
    </Container>
  )

 
}

export default App
