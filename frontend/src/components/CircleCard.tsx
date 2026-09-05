import type { CircleResponse } from "@/types/types";

interface CircleCardProp  {
    circle: CircleResponse
}

export function CircleCard({circle}: CircleCardProp) {
    return (
        <div>
           <span>{circle.id}</span> 
           <span>{circle.name}</span> 
           <span>{circle.contributionAmount}</span> 
           <span>{circle.frequency}</span> 
           <span>{circle.maxMembers}</span> 
           <span>{circle.startDate}</span> 
           <span>{circle.inviteCode}</span> 
           <span>{circle.currentCycle}</span> 
        </div>
    )

}
export default CircleCard