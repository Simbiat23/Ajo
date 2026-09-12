import type { CircleResponse } from "@/types/types";
import { Badge, Box, Button, Heading,Stack, Text } from "@chakra-ui/react";

interface CircleCardProp  {
    circle: CircleResponse
    onClickCard?: () => void;
    onClickButton?: () => void
    isDetailPage?: boolean
}

export function CircleCard({circle, onClickCard, onClickButton, isDetailPage}: CircleCardProp) {
    return (   
          <Box onClick={onClickCard} borderWidth="1px" borderRadius="md" padding="6" maxWidth="400px">
            <Heading>Circle Name: {circle.name}</Heading> 
            <Stack gap= "2">
                    <Text> Circle Id: {circle.id}</Text>
                    <Text>Contribution: £{circle.contributionAmount}</Text> 
                    <Badge>Frequency: {circle.frequency}</Badge> 
                    <Text>Max Members: {circle.maxMembers}</Text> 
                    <Text>Start Date: {circle.startDate}</Text> 
                    <Text>Invite Code: {circle.inviteCode}</Text> 
                    <Text>Current Cycle: {circle.currentCycle}</Text> 
                </Stack>  
                <br/>
                {isDetailPage && <Button onClick={onClickButton}>Edit Circle</Button>}
                
            </Box>
       
    )

}
export default CircleCard