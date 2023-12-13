import { Inject, Injectable } from "@angular/core";
import { API_ENDPOINTS } from "./tokens/endpoints.token";
import { AuthToken, UserCredentials } from "@k-rental/dtos";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService{


    #baseUrl!: string;


    constructor(
        @Inject(API_ENDPOINTS) endpoints: API_ENDPOINTS,
        private http: HttpClient,
    ){
        this.#baseUrl = `${endpoints.API_BASE_URL}/auth`;
    }


    login(userCredentials: UserCredentials): Observable<AuthToken>{
        const url = `${this.#baseUrl}/login`
        return this.http.post<AuthToken>(url, userCredentials);
    }



}