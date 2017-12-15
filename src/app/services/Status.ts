export class Status {
    constructor( 
        public id: number,
        public location_id: number,
        public operator: string,
        public civil_status: string,
        public coverage_status: string,
        public onAir_status: string,
        ) {}
}
