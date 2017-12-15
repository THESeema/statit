import { Injectable } from '@angular/core';
import {Headers , Http,Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Status }        from './Status';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StatusService {
  private baseUrl : string = "http://localhost:63067/api/Status"
  private headers = new Headers({'Content-Type': 'application/json'});
  
                constructor(private http: Http) {}
                getLocations(oper: string): Promise<Status[]> {
                    const url = `${this.baseUrl}?oper=${oper}`;
                    return this.http.get(url)
                               .toPromise()
                               .then(response => response.json() as Status[])
                               .catch(this.handleError);
                  }

                  getData(): Observable<Status[]> {
                    return this.http.get(this.baseUrl)
                      .map(data => data.json() as Status[])
                      .catch(err => {
                        console.log("error fetching data", err);
                        return Observable.throw(err.json());
                    });
                  }

          

                  getNewLocations(oper: string): Promise<Status[]> {
                    const url = `${this.baseUrl}?oper=${oper}&civil_status=Not%20Yet&coverage_status=Not%20Yet&onAir_status=Not%20Yet`;
                    return this.http.get(url)
                               .toPromise()
                               .then(response => response.json() as Status[])
                               .catch(this.handleError);
                  }

                getStatusID(id:number){
                    const url = `${this.baseUrl}/${id}`;
                    return this.http.get(url)
                    .map((response: Response) => response.json().data as Status)
                    .catch(this.errorHandler);
                    }

                      
                    update(sat: Status): Promise<Status> {
                      const url = `${this.baseUrl}/${sat.id}`;
                      return this.http
                        .put(url, JSON.stringify(sat), {headers: this.headers})
                        .toPromise()
                        .then(() => sat)
                        .catch(this.handleError);
                    }


                    create(location_id: number,operator: string,civil_Status: string,coverage_Status: string,onAir_Status: string): Promise<Status> {
                        return this.http
                          .post(this.baseUrl, JSON.stringify({location_id: location_id,operator:operator,civil_Status:civil_Status,coverage_Status:coverage_Status,onAir_Status:onAir_Status}), {headers: this.headers})
                          .toPromise()
                          .then(res => res.json().data as Status)
                          .catch(this.handleError);
                      }
                    
                      delete(id: number): Promise<void> {
                        const url = `${this.baseUrl}/${id}`;
                        return this.http.delete(url, {headers: this.headers})
                          .toPromise()
                          .then(() => null)
                          .catch(this.handleError);
                      }


                errorHandler(error: Response){
                  console.error(error);
                  return Observable.throw(error || "Server Eroor");
                }
                private handleError(error: any): Promise<any> {
                    console.error('An error occurred', error); // for demo purposes only
                    return Promise.reject(error.message || error);
                  }
}

