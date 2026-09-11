import { httpApi } from "@/api/api";
import type { CircleResponse } from "@/types/types";
import { Grid, GridItem, SimpleGrid, Stack} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CircleCard from "./CircleCard";

interface CircleListProp {
    onClickedCard: (circle: CircleResponse) => void
}

export type RequestState<T> =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: T }
    | { status: 'error'; error: Error };
export function CircleList({onClickedCard}: CircleListProp) {
    const [state, setState] = useState<RequestState<CircleResponse[]>>({status:'idle'})
   

    async function load() {
        setState({status: 'loading'})
        try {
            const circles = await httpApi.getAllCircle()
            setState({status:'success', data: circles})
         
        } catch(error) {
            setState({
                status:'error',
                error: error instanceof Error ? error: new Error('Unknown error')

            })
        }
        
    }

    useEffect ( 
        () => {
            load()
        }, []
    )

    // handler function to handle card click and display the details page

    async function handleOnClick (clickedCircle: CircleResponse) {

         const getClickedCircle = await httpApi.getCircleById(clickedCircle.id)
                if (!getClickedCircle) {
                    throw new Error('Circle not found')
                } else {
                    onClickedCard(getClickedCircle);
                }  

       
    }

    
    switch(state.status) {
        case 'idle':
            return <p> Nothing loaded yet. Press Refresh</p>
        case 'loading':
            return <p>Loading Circles</p>
        case 'error':
             return <p>Something went wrong: {state.error.message}</p>
        case 'success':
            return(
                <SimpleGrid columns={2} gap={4} >
                    {state.data.map((circle) => (     
                        <CircleCard onClickCard={() => handleOnClick(circle)} key={circle.id} circle={circle}/>
                       
                        
                    ))}
                </SimpleGrid>
            )

            

    }



}
export default CircleList;