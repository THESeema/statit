import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './authentication.service';
import { User } from './user';

@Injectable()
export class UserService {
    private baseUrl : string = "http://localhost:63067/api/Login";
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get(this.baseUrl, options)
            .map((response: Response) => response.json());
              
    }
  

    // getData(): Observable<AramcoLocation[]> {
    //     return this.http.get(this.baseUrl)
    //       .map(data => data.json() as AramcoLocation[])
  
    //   }
}