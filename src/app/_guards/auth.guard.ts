import { Injectable } from '@angular/core';
import {Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/sign-in']);
        return false;
    }
}

// @Injectable()
// export class AuthGuard implements CanActivate {

//     constructor(private router: Router) { }

        // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            
        //     let arr = JSON.parse(localStorage.getItem('currentUser'));     
    
        //     let canActivate: boolean,
        //         userRole: string = arr.username,
        //         permission = route.data["permission"];
        //         console.log(userRole);
    
        //     if (!permission) throw new Error('Permissions is not setup!');
        //     if (!permission.only.length) throw new Error('Roles are not setup!');
    
        //     canActivate = permission.only.includes(userRole);
    
        //     if (!canActivate) this.router.navigate([permission.redirectTo]);
    
        //     return canActivate;
        // }


        // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //     let theuser="";
        //     if (localStorage.getItem('currentUser')) {
        //         theuser= JSON.parse(localStorage.getItem('currentUser')).username;     
        //     }
        //     let canActivate: boolean,
        //         userRole: string = theuser,
        //         permission = route.data["permission"];
        //         console.log(userRole);
    
        //     if (!permission) throw new Error('Permissions is not setup!');
        //     if (!permission.only.length) throw new Error('Roles are not setup!');
           
        //     canActivate = permission.only.includes(userRole);
        //     if (!canActivate) this.router.navigate([permission.redirectTo]);
            
        //     return canActivate;
        // }

   // }
