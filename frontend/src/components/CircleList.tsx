import { httpApi } from "@/api/api";
import type { CircleResponse } from "@/types/types";
import { Grid, GridItem, Stack} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CircleCard from "./CircleCard";

export type RequestState<T> =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: T }
    | { status: 'error'; error: Error };
export function CircleList() {
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

    
    switch(state.status) {
        case 'idle':
            return <p> Nothing loaded yet. Press Refresh</p>
        case 'loading':
            return <p>Loading Circles</p>
        case 'error':
             return <p>Something went wrong: {state.error.message}</p>
        case 'success':
            return(
                <Grid>
                    {state.data.map((circle) => (
                        <GridItem>
                            <CircleCard key={circle.id} circle={circle}/>
                        </GridItem>
                        
                    ))}
                </Grid>
            )

            

    }



}
export default CircleList;