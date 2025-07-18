import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root', 
})
export class AsesoriaService {

    private baseUrl = `${environment.localUrl}`;

    constructor (private http: HttpClient){}

    agendarAsesoria(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/mail/enviar/confirmacion/asesoria`,data)
    }
}