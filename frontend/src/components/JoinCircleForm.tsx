import { httpApi } from "@/api/api"
import type { CircleResponse,UserResponse } from "@/types/types"
import { Box, Button, Field, Heading, Input, Stack, Text } from "@chakra-ui/react"
import {useState } from "react"

interface JoinCircleFormProps {
    onJoinCircle: (circle:CircleResponse) => void
    loggedInUser: UserResponse

}


export default function JoinCircleForm({onJoinCircle, loggedInUser}: JoinCircleFormProps) {
    const [inviteCode, setInviteCode] = useState('')
    const [errors, setErrors] = useState('')
    const [submitError, setSubmitError] = useState('')

    async function handleSubmit(event:React.SubmitEvent<HTMLDivElement>) {
        event.preventDefault()
        const isValid = /^AJO-\d{4}$/.test(inviteCode)
        if (!isValid) {
            setErrors('Please enter a valid invite code')
            return;
        }
        try {
            const joinCircle = await httpApi.joinCircle(inviteCode, loggedInUser.id)
            onJoinCircle(joinCircle);
        } catch(err) {
             setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.' )
        }
        
    }




    return (
        <Box  as="form" onSubmit={handleSubmit} borderWidth= "1px" borderRadius="md" padding="6" maxWidth="480px">
            <Heading size="md" marginBottom="4">Join A Circle</Heading>
            <Stack gap={4}>
                <Field.Root invalid={!!errors}>
                    <Field.Label>Invite Code</Field.Label>         
                    <Input value={inviteCode} onChange={(event) => setInviteCode(event.target.value)} placeholder="Enter invite code" type="text" />
                    {errors && <Field.ErrorText>{errors}</Field.ErrorText>}
                </Field.Root>
                </Stack>
                
                <Button type="submit" width="100%">Join</Button>
                {submitError && <Text color="red.500">{submitError}</Text>}
            </Box>
            
        )
    
}