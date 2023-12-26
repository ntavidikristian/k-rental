import { Inject, Injectable } from "@angular/core";
import { API_ENDPOINTS } from "../tokens/endpoints.token";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CarService{
    #baseUrl!: string;


    constructor(
        @Inject(API_ENDPOINTS) endpoints: API_ENDPOINTS,
        private http: HttpClient,
    ){
        this.#baseUrl = `${endpoints.API_BASE_URL}/car`;
    }

    public getAllCars(): Observable<any>{
        const url = this.#baseUrl;
        return this.http.get(url);
    }

}