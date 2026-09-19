import { httpApi } from "@/api/api";
import type { UserResponse } from "@/types/types";
import { Box, Button, Field, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

interface LoginFormProp {
    onLoginSuccess: (user: UserResponse) => void
}

export default function LoginForm({onLoginSuccess}: LoginFormProp) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitError, setSubmitError] = useState('')


    async function handleSubmit(event: React.SubmitEvent<HTMLDivElement>) {
        event.preventDefault();
        try {
            const userLogin = await httpApi.loginUser({email, password})
            onLoginSuccess(userLogin);

        } catch(err) {
             setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.' )
        }
        
    }

    return (
        <Box  as="form" onSubmit={handleSubmit} borderWidth= "1px" borderRadius="md" padding="6" maxWidth="480px">
            <Heading size="md" marginBottom="4">Login to your account</Heading>
            <Stack gap={4}>
                <Field.Root>
                    <Field.Label>Email</Field.Label>         
                    <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter Email Address" type="text" />
                </Field.Root>
            </Stack>
            <Stack>
                <Field.Root>
                    <Field.Label>Password</Field.Label>         
                    <Input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter Password" type="password" />
                </Field.Root>
            </Stack>
            <Button type="submit" width="100%">Login</Button>
            {submitError && <Text color="red.500">{submitError}</Text>}
        </Box>
    )

}
