// import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
// import { MockBackend, MockConnection } from '@angular/http/testing';



// export let fakeBackendProvider = { 
//     // use fake backend in place of Http service for backend-less development
//     provide: Http, 
//     useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
//         // configure fake backend
//         backend.connections.subscribe((connection: MockConnection) => {
//             let testUser = [ 
//             {username: 'Aramco', password: '1'},
//             {username: 'STC', password: '1'}, 
//             {username: 'Mobily', password: '1'},
//             {username: 'Zain', password: '1'} 
//             ];
            

//             // wrap in timeout to simulate server api call
//             setTimeout(() => {

//                 // fake authenticate api end point
//                 if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                   
//                     // get parameters from post request
//                     let params = JSON.parse(connection.request.getBody());
//                     let usered=false;
//                     // check user credentials and return fake jwt token if valid
//                     testUser.forEach(function(obj) { 
//                     if (params.username === obj.username && params.password === obj.password) {
//                         usered=true;
//                         connection.mockRespond(new Response(
//                             new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
//                         ));
//                     } 
    
//                 });
//                 if(!usered){
//                 connection.mockRespond(new Response(
//                             new ResponseOptions({ status: 200 })
//                         ));
//                     }
//                 }

//                 // // fake users api end point
//                 // if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
//                 //     // check for fake auth token in header and return test users if valid, this security is implemented server side
//                 //     // in a real application
//                 //     if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
//                 //         connection.mockRespond(new Response(
//                 //             new ResponseOptions({ status: 200, body: [testUser] })
//                 //         ));
//                 //     } else {
//                 //         // return 401 not authorised if token is null or invalid
//                 //         connection.mockRespond(new Response(
//                 //             new ResponseOptions({ status: 401 })
//                 //         ));
//                 //     }
//                 // }

//             }, 500);

//         });

//         return new Http(backend, options);
//     },
//     deps: [MockBackend, BaseRequestOptions]
// };

import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function mockBackEndFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    let testUser = [ 
        {username: 'Aramco', password: '1'},
        {username: 'STC', password: '1'}, 
        {username: 'Mobily', password: '1'},
        {username: 'Zain', password: '1'} 
        ];


       backend.connections.subscribe((connection: MockConnection) => {
            

            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // fake authenticate api end point
                if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                   
                    // get parameters from post request
                    let params = JSON.parse(connection.request.getBody());
                    let usered=false;
                    // check user credentials and return fake jwt token if valid
                    testUser.forEach(function(obj) { 
                    if (params.username === obj.username && params.password === obj.password) {
                        usered=true;
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
                        ));
                    } 
    
                });
                if(!usered){
                connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200 })
                        ));
                    }
                }

                // // fake users api end point
                // if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                //     // check for fake auth token in header and return test users if valid, this security is implemented server side
                //     // in a real application
                //     if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                //         connection.mockRespond(new Response(
                //             new ResponseOptions({ status: 200, body: [testUser] })
                //         ));
                //     } else {
                //         // return 401 not authorised if token is null or invalid
                //         connection.mockRespond(new Response(
                //             new ResponseOptions({ status: 401 })
                //         ));
                //     }
                // }

            }, 500);

        });

        return new Http(backend, options);
    }
    export let fakeBackendProvider = {
        // use fake backend in place of Http service for backend-less development
        provide: Http,
        deps: [MockBackend, BaseRequestOptions, XHRBackend],
        useFactory: mockBackEndFactory
    };