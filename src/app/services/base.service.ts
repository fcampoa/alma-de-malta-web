import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/enviroment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BaseService <T>{
    protected environment = environment;
    constructor(protected http: HttpClient, protected endpoint: String) {
     }

    get(): Observable<T[]> {
        return this.http.get<T[]>(`${this.environment.apiBaseUrl}/${this.endpoint}`);
     }

    getById(id: number): Observable<T> {
            return this.http.get<T>(`${this.environment.apiBaseUrl}/${this.endpoint}/${id}`);
    }

    getOne(url: string): Observable<T> {
        return this.http.get<T>(`${this.environment.apiBaseUrl}/${url}`);
    }

    create(body: T): Observable<T> {
        return this.http.post<T>(`${this.environment.apiBaseUrl}/${this.endpoint}`, body);
    }

    update( body: T, id: string): Observable<T> {
        return this.http.put<T>(`${this.environment.apiBaseUrl}/${this.endpoint}/${id}`, body);
    }

    delete(id: string) {
        return this.http.delete(`${this.environment.apiBaseUrl}/${this.endpoint}/${id}`);
    }
}