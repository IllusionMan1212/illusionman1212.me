import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    private baseUrl = environment.baseURL;

    public makeRequest(requestObject) : any {
        let httpMethod = requestObject.method.toLowerCase();
        if (!httpMethod) return console.log("no http method provided");
        let endpoint = requestObject.endpoint;
        if (!endpoint) return console.log("no endpoint has been provided");
        let url = `${this.baseUrl}/${endpoint}`;

        let body = requestObject.body || {};

        if (httpMethod == "get") {
            return this.http.get(url, requestObject.headers).toPromise()
            .then((value) => {
                return value;
            })
            .catch((err) => {
                return err;
            });
        } else if (httpMethod == "post") {
            return this.http.post(url, body, requestObject.headers).toPromise()
            .then((value) => {
                return value;
            })
            .catch((err) => {
                return err;
            });
        }

        console.log("could not make the request, make sure you provided a GET or a POST method")
    }
}
