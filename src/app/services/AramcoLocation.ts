//import { Status }        from '../services/Status';


// export class AramcoLocation {
//     constructor( 
//         public id: number,
//         public area: string,
//         public sub_area: string,
//         public location_title: string,
//         public assigned_to: string,
//         //public status: Status[],
//         ) {}
// }


export interface AramcoLocation { 
    id: number;
    area: string;
    sub_area: string;
    location_title: string;
    lat: number;
    long: number;
    assigned_to: string;
    status: Status[];


 }

 export interface Status {
     id: number;
     location_id: number;
     operator: string;
     civil_status: string;
     coverage_status: string;
     onAir_status: string;

 }