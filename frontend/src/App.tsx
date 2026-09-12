
import { useState } from 'react'
import CircleForm from './components/CircleForm'
import type { CircleResponse } from './types/types'
import CircleCard from './components/CircleCard'
import CircleList from './components/CircleList'
import { Button, Container, Heading, HStack } from '@chakra-ui/react'
import { httpApi } from './api/api'

type Page = 'home' | 'create' | 'detail'| 'edit';
function App() {
  // Lifting state up: createdCircle lives here (not inside CircleForm) and shared arcoss multiple components
  const [createdCircle, setCreatedCircle] = useState<CircleResponse | null>(null)
  const [page, setPage] = useState<Page>('home') 

//async function to call deleteCircle api 
 async function handleOndelete(circle: CircleResponse) {
    await httpApi.deleteCircle(circle.id)

 }

// Helper function containing switch statments since switch cannot be used dirently inside the JSX
  function renderPage() {
    switch(page) {
      case 'home': // home case renders the list of all circles
        return <CircleList onClickedCard={(circle) => 
          {setCreatedCircle(circle)
            setPage('detail')}}/>
      case 'create':  // create case that renders a form when clicked from the 'New Circle' button in the home page 
        return <CircleForm onCircleCreated={(circle) => {
          setCreatedCircle(circle)
          setPage('detail')
        }}/>
      case 'detail': // detail case that renders circleCard for a circle that has either been clicked or just created 
        if (createdCircle !== null) {
          return <CircleCard isDetailPage ={true} circle={createdCircle} onClickButton={() =>
            setPage('edit') 
          } onDeleteButton={async () => {
            await handleOndelete(createdCircle)
            setPage('home')
          }}/>
        }
        return null
      case 'edit': // edit case that renders prefilled CircleForm to allow user to edit existing circle
        if (createdCircle !== null) {
          return <CircleForm existingCircle={createdCircle} onCircleCreated={ (circle) => {
            setCreatedCircle(circle)
            setPage('detail')
          }}/>

        }
        return null
        

        
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
