
export type Frequency = "WEEKLY" | "BIWEEKLY" | "MONTHLY";

export interface CircleResponse  {
    id: number;
    name: string;
    contributionAmount: number;
    frequency: Frequency;
    maxMembers: number;
    startDate: string;
    inviteCode: string;
    currentCycle: number;
}

export interface CircleRequest {
    name: string;
    contributionAmount: number;
    frequency: Frequency;
    maxMembers: number;
    startDate: string;
    
}

export interface FormErrors {
    name: string; // 10 characters limit 
    maxMembers: number; // Only five memebers can join at a time
    startDate: string; // Valid date format - (12/07/2026)
    

}
