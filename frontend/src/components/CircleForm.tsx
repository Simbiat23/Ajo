import type { Frequency } from "@/types/types";
import { useState } from "react";


function CircleForm() {
    const [name, setName] = useState('')
    const [contributionAmount, setContributionAmount] = useState(0)
    const [frequency, setFrequency] = useState<Frequency>('BIWEEKLY')
    const [maxMembers, setMaxMembers] = useState(0)
    const [startDate, setStartDate] = useState('')

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();
        console.log("Form submitted")
    }
    

    return (
        <form onSubmit={handleSubmit} >
            <label>Circle Name</label>
            <br />
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter Circle name" type="text" />
            <br />
            <label>Contribution amount</label>
            <br />
            <input type="number"  value={contributionAmount} onChange={(event) => setContributionAmount(event.target.valueAsNumber)}/>
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
            <input type="number"  value={maxMembers} onChange={(event) => setMaxMembers(event.target.valueAsNumber)}/>
            <br />
            <label>StartDate</label>
            <br />
            <input type="text"  value={startDate} onChange={(event) => setStartDate(event.target.value)} placeholder="Enter a start Date"/>
            <br />

            <button type="submit"> Create Circle</button>
        </form>
    )

}
export default CircleForm;
