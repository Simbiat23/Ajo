import { Button, Heading, HStack } from "@chakra-ui/react"

interface LandingPageProps{
    onClickButton : () => void
}

export default function LandingPage({onClickButton}: LandingPageProps) {
    return (

         <HStack justifyContent="space-between">
            <Heading >ÀJỌ</Heading>
            <Button onClick={onClickButton}>Login</Button>
         </ HStack>
    )
}