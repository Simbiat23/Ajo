import type { CircleResponse } from "@/types/types";
import { Badge, Box, Heading,Stack, Text } from "@chakra-ui/react";

interface CircleCardProp  {
    circle: CircleResponse
    onClickCard?: () => void;
}

export function CircleCard({circle, onClickCard}: CircleCardProp) {
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
            </Box>
       
    )

}
export default CircleCard