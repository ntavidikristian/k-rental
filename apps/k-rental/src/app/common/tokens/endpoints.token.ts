import { InjectionToken } from "@angular/core";

export const API_ENDPOINTS = new InjectionToken<API_ENDPOINTS>('API_ENDPOINTS', {
    providedIn: 'root',
    factory: () =>({
        API_BASE_URL: 'http://localhost:3000/api'
    })
});


export interface API_ENDPOINTS{
    API_BASE_URL: string;
}