import { httpApi } from "@/api/api";
import type { CircleRequest, CircleResponse, Frequency } from "@/types/types";
import { Box, Button, Field, Heading, Input, NativeSelect, Stack, Text } from "@chakra-ui/react";

import { useState } from "react";

interface CircleFormProp {
    onCircleCreated : (circle: CircleResponse) => void
    existingCircle?: CircleResponse
}
interface FormErrors {
    name?: string;
    contributionAmount?: string;
    maxMembers?: string;
    startDate?: string;
}
// a Function to check the form is valid 
function validateForm(name: string, contributionAmount: string, maxMembers: string, startDate: string): FormErrors{
    const newErrors: FormErrors = {}
    // converting the strings to number because the type input accepts a string leteral
    const amountNum = Number(contributionAmount);
    const membersNum = Number(maxMembers);
    if (name === '') {
        newErrors.name = 'Please enter a circle name';
    }
    if (amountNum <= 0) {
        newErrors.contributionAmount = 'Enter an amount greater than 0'
    }
    if (membersNum < 2 ) {
        newErrors.maxMembers = 'Members must have at least 2 members'

    }
    if (startDate === '') {
        newErrors.startDate = 'Please select a start date'
    }

    return newErrors;
}

function CircleForm({onCircleCreated, existingCircle}: CircleFormProp) {
    const [name, setName] = useState(existingCircle?.name || '')
    const [contributionAmount, setContributionAmount] = useState(existingCircle ? String(existingCircle.contributionAmount) : '')
    const [frequency, setFrequency] = useState<Frequency>(existingCircle?.frequency ||'BIWEEKLY')
    const [maxMembers, setMaxMembers] = useState(existingCircle ? String(existingCircle?.maxMembers) : '')
    const [startDate, setStartDate] = useState(existingCircle?.startDate || '')
    const [errors, setErrors] = useState<FormErrors>({})
    const [submitError, setSubmitError] = useState('')

    async function handleSubmit(event: React.SubmitEvent<HTMLDivElement>){
        event.preventDefault();
        const newError = validateForm(name, contributionAmount, maxMembers, startDate)
        setErrors(newError)
        if (Object.keys(newError).length > 0) {
            return;
        }

        try {
            if (!existingCircle) {
                const newCircle = await httpApi.createCircle({name, contributionAmount: Number(contributionAmount), frequency, maxMembers: Number(maxMembers), startDate})
                onCircleCreated(newCircle);

            } else {
                const updateCircle = await httpApi.updateCircle(existingCircle.id, {name, contributionAmount: Number(contributionAmount), frequency, maxMembers: Number(maxMembers), startDate})
                onCircleCreated(updateCircle)
            }
            
            
        
        //  Catch block to catch submit error from api client to use to later display on ui

        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.' )

        }

        
    }
    

    return (
        <Box as="form" onSubmit={handleSubmit} borderWidth= "1px" borderRadius="md" padding="6" maxWidth="480px" >
            <Heading size="md" marginBottom="4">{!existingCircle ? "Create a circle" : "Edit Circle"}</Heading>

            <Stack gap="4">
                <Field.Root invalid={!!errors.name}>
                    <Field.Label>Circle Name</Field.Label>         
                    <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter Circle name" type="text" />
                    {errors.name && <Field.ErrorText>{errors.name}</Field.ErrorText>}
                </Field.Root>


               <Stack direction="row" gap="4">
                    <Field.Root invalid={!!errors.contributionAmount}>
                        <Field.Label>Contribution amount</Field.Label>
                
                        <Input  value={contributionAmount} onChange={(event) => setContributionAmount(event.target.value)}/>
                        {errors.contributionAmount && <Field.ErrorText>{errors.contributionAmount}</Field.ErrorText>}
                    </Field.Root>

                    <Field.Root invalid={!!errors.maxMembers}>
                        <Field.Label>MaxMember</Field.Label>
                        <Input   value={maxMembers} onChange={(event) => setMaxMembers(event.target.value)}/>
                        {errors.maxMembers && <Field.ErrorText>{errors.maxMembers}</Field.ErrorText>}
                    </Field.Root>
                </Stack>

               
                <Stack direction="row" gap="4">
                    <Field.Root>
                        <Field.Label>Frequency</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field value={frequency} onChange={(event) => setFrequency(event.target.value as Frequency)}>
                                <option value="WEEKLY" >WEEKLY</option>
                                <option value="BIWEEKLY" >BIWEEKLY</option>
                                <option value="MONTHLY" >MONTHLY</option>
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    </Field.Root>
                    <Field.Root invalid={!!errors.startDate}>   
                        <Field.Label>Start date</Field.Label>
                        <Input type="date"  value={startDate} onChange={(event) => setStartDate(event.target.value)} placeholder="Enter a start Date"/>
                        {errors.startDate && <Field.ErrorText>{errors.startDate}</Field.ErrorText>}
                    </Field.Root>  
                </Stack>
            

                <Button type="submit" width="100%"> {!existingCircle ? "Create Circle" : "Update Circle"}</Button>
                {submitError && <Text color="red.500">{submitError}</Text>}
            </Stack>
        </Box>
    )

}
export default CircleForm;
