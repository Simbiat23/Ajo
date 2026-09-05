import { httpApi } from "@/api/api";
import type { CircleResponse, Frequency } from "@/types/types";

import { useState } from "react";

interface CircleFormProp {
    onCircleCreated : (circle: CircleResponse) => void
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
    // converting the strings to number because the type input accets a string leteral
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
function CircleForm({onCircleCreated}: CircleFormProp) {
    const [name, setName] = useState('')
    const [contributionAmount, setContributionAmount] = useState('')
    const [frequency, setFrequency] = useState<Frequency>('BIWEEKLY')
    const [maxMembers, setMaxMembers] = useState('')
    const [startDate, setStartDate] = useState('')
    const [errors, setErrors] = useState<FormErrors>({})
    const [submitError, setSubmitError] = useState('')

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();
        const newError = validateForm(name, contributionAmount, maxMembers, startDate)
        setErrors(newError)
        if (Object.keys(newError).length > 0) {
            return;
        }

        try {
            
            const newCircle = await httpApi.createCircle({name, contributionAmount: Number(contributionAmount)
            , frequency, maxMembers: Number(maxMembers), startDate})
            onCircleCreated(newCircle);
        
        //  Catch block to catch submit error from api client to use to later display on ui

        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.' )

        }

        
    }
    

    return (
        <form onSubmit={handleSubmit} >
            <label>Circle Name</label>
            <br />
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter Circle name" type="text" />
            {errors.name && <span>{errors.name}</span>}
            <br />
            <label>Contribution amount</label>
            <br />
            <input  value={contributionAmount} onChange={(event) => setContributionAmount(event.target.value)}/>
            {errors.contributionAmount && <span>{errors.contributionAmount}</span>}
            <br />
            <label>Frequency</label>
            <select value={frequency} onChange={(event) => setFrequency(event.target.value as Frequency)}>
                <option value="WEEKLY" >WEEKLY</option>
                <option value="BIWEEKLY" >BIWEEKLY</option>
                <option value="MONTHLY" >MONTHLY</option>
            </select>
            <br />
            <label>MaxMember</label>
            <br />
            <input   value={maxMembers} onChange={(event) => setMaxMembers(event.target.value)}/>
            {errors.maxMembers && <span>{errors.maxMembers}</span>}
            <br />
            <label>StartDate</label>
            <br />
            <input type="date"  value={startDate} onChange={(event) => setStartDate(event.target.value)} placeholder="Enter a start Date"/>
            {errors.startDate && <span>{errors.startDate}</span>}
            <br />

            <button type="submit"> Create Circle</button>
            {submitError && <p>{submitError}</p>}
        </form>
    )

}
export default CircleForm;
