// API Client 
// Components never call fetch directly: they import `api` and get typed promises back. 
// The client owns the network contract; the components own the UI.

import type { CircleRequest, CircleResponse } from "../types/types";

export interface Api {
    createCircle(input: CircleRequest): Promise<CircleResponse>;
    getAllCircle(): Promise<CircleResponse[]>;
    getCircleById(id: number): Promise<CircleResponse | undefined>;
    updateCircle(id: number, input: CircleRequest): Promise<CircleResponse>;
    deleteCircle(id: number): Promise<void>;


}

const BASE_URL = 'http://localhost:8080';

function responseOk(response: Response, request: string) {
    if (!response.ok) {
        throw new Error (
            `Failed to ${request}: the server responded with` +
            `${response.status} ${response.statusText}. ` 
            
        )
    }
}

export const httpApi: Api = {

    async createCircle(input: CircleRequest) {
        const response = await fetch(`${BASE_URL}/ajo/circle/createcircle`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(input)
        });
        responseOk(response, 'Create Circle');
        return(await response.json()) as CircleResponse

    },

    async getAllCircle() {
        const response = await fetch(`${BASE_URL}/ajo/circle`);
        responseOk(response, "Get all circle");
        return(await response.json()) as CircleResponse[];
    },

    async getCircleById(id: number) {
        const response = await fetch(`${BASE_URL}/ajo/circle/${id}`);
        responseOk(response, "Get circle id");
        return(await response.json()) as CircleResponse;
    },

    async updateCircle(id: number, input: CircleRequest) {
        const response = await fetch(`${BASE_URL}/ajo/circle/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(input)
        });
        responseOk(response, 'Update Circle');
        return(await response.json()) as CircleResponse;
        
    },

    async deleteCircle(id: number) {
        const response = await fetch(`${BASE_URL}/ajo/circle/${id}`, {
            method: 'DELETE'
        });
        responseOk(response, 'Delete Circle');
        
    },
}