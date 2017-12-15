import { Injectable } from '@angular/core';

import { IMenuItem } from './menu-item';
import { MENUITEMS,MENUITEMS2 } from './mock-menu-items';
import { MENU ,MENU2} from '../../../../settings/menu';


@Injectable()
export class MenuService {
  
  getMenuItems(): Promise<IMenuItem[]> {
    var arr = JSON.parse(localStorage.getItem('currentUser'));    
    if(arr.username==="Aramco"){
    return Promise.resolve(MENUITEMS);}
    else{
    return Promise.resolve(MENUITEMS2);
    }
  }
}