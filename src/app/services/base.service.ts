import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BaseService<T, K>{
    protected environment = environment;
    constructor(protected http: HttpClient, protected endpoint: String) {
     }

    get(): Observable<K> {
        return this.http.get<K>(`${this.environment.apiBaseUrl}/${this.endpoint}`);
     }

    getById(id: any): Observable<K> {
            return this.http.get<K>(`${this.environment.apiBaseUrl}/${this.endpoint}/${id}`);
    }

    getOne(url: string): Observable<K> {
        return this.http.get<K>(`${this.environment.apiBaseUrl}/${url}`);
    }

    create(body: T): Observable<K> {
        return this.http.post<K>(`${this.environment.apiBaseUrl}/${this.endpoint}`, body);
    }

    update( body: T, id: any): Observable<K> {
        return this.http.put<K>(`${this.environment.apiBaseUrl}/${this.endpoint}/${id}`, body);
    }

    delete(id: any) {
        return this.http.delete(`${this.environment.apiBaseUrl}/${this.endpoint}/${id}`);
    }

    search(searchTerm: any): Observable<K> {
        return this.http.post<K>(`${this.environment.apiBaseUrl}/${this.endpoint}/search`, searchTerm);
    }
}