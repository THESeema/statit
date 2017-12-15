import { Injectable } from '@angular/core';
import {Headers , Http,Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AramcoLocation }        from './AramcoLocation';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LocationsService {
  private baseUrl : string = "http://localhost:63067/api/Location";
  private headers = new Headers({'Content-Type': 'application/json'});
  
                constructor(private http: Http) {}
                
                // getlocations(){
                // return this.http.get(this.baseUrl)
                // .map((response: Response) => response.json())
                // .catch(this.errorHandler);
                // }
                getSpecificLocation(area:string, sub_area:string, location_title:string, assigned_to:string){
                  const url = `${this.baseUrl}?area=${area}&sub_area=${sub_area}&location_title=${location_title}&assigned_to=${assigned_to}`;
                  return this.http.get(url)
                  .map((response: Response) => response.json().data as AramcoLocation)
                  .catch(this.errorHandler); 
                }
                getlocations(): Promise<AramcoLocation[]> {
                    return this.http.get(this.baseUrl)
                               .toPromise()
                               .then(response => response.json() as AramcoLocation[])
                               .catch(this.handleError);
                  }

                  getData(): Observable<AramcoLocation[]> {
                    return this.http.get(this.baseUrl)
                      .map(data => data.json() as AramcoLocation[])
                      .catch(err => {
                        console.log("error fetching data", err);
                        return Observable.throw(err.json());
                    });
                  }

                getlocation(id:number){
                    const url = `${this.baseUrl}/${id}`;
                    return this.http.get(url)
                    .map((response: Response) => response.json().data as AramcoLocation)
                    .catch(this.errorHandler);
                    }

                      
                    update(loc: AramcoLocation): Promise<AramcoLocation> {
                      const url = `${this.baseUrl}/${loc.id}`;
                      return this.http
                        .put(url, JSON.stringify(loc), {headers: this.headers})
                        .toPromise()
                        .then(() => loc)
                        .catch(this.handleError);
                    }

                    create(area: string,sub_area: string,location_title: string,assigned_to: string): Promise<AramcoLocation> {
                        return this.http
                          .post(this.baseUrl, JSON.stringify({area: area,sub_area:sub_area,location_title:location_title,assigned_to:assigned_to}), {headers: this.headers})
                          .toPromise()
                          .then(res => res.json().data as AramcoLocation)
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


////diffirent attempt
// getLocations(): Promise<Location[]> {
//   return this.http.get(this.baseUrl)
//              .toPromise()
//              .then(response => response.json().data as Location[])
//              .catch(this.handleError);
// }

// private handleError(error: any): Promise<any> {
//   console.error('An error occurred', error); // for demo purposes only
//   return Promise.reject(error.message || error);
//}

//}

// import { Injectable } from '@angular/core';  
// import { Http, Headers, RequestOptions, Response } from '@angular/http';  
//  import { Location } from './location';
// import { Observable, Subject } from 'rxjs/Rx';  
// import 'rxjs/Rx'; //get everything from Rx  
// import 'rxjs/add/operator/toPromise';  
// @Injectable()  
// export class LocationsService {  
// apiUrl: string = "http://localhost:53538/api/locations";// Web API URL  
// constructor(private _http: Http) { }  
// private RegenerateData = new Subject<number>();  
// RegenerateData$ = this.RegenerateData.asObservable();  
// AnnounceChange(mission: number) {  
// this.RegenerateData.next(mission);  
// }  
// // //  
// // getCricketers() {  
// // return this._http.get(this.apiUrl)  
// // .map((response) => response.json());  
// //}  
// getLocations(): Observable<Location[]> {  
// return this._http.get(this.apiUrl)  
// .map((res: Response) => res.json())  
// .catch((error: any) => Observable.throw(error.json().error || 'Server error'));  
// }  
// }  