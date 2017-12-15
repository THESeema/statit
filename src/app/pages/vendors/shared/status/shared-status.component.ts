import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../layouts/shared-service';
import { Router }              from '@angular/router';
import { StatusService } from '../../../../services/status.service';
import { Status }        from '../../../../services/Status';
import { LocationsService } from '../../../../services/location.service';
declare var swal: any;

@Component({
  moduleId: module.id,
  selector: 'shared-status',
  templateUrl: './shared-status.component.html',
  styleUrls: ['./shared-status.component.scss']
})
export class PageStatussharedComponent implements OnInit {
vendor = JSON.parse(localStorage.getItem('currentUser')).username;      
pageTitle: string = this.vendor+' Status';
status: Status[]=[];
newstatus: Status[]=[];
selectedLocation: Status;
location_title;
civil_notyet= false;
civil_inprogress= false;
civil_completed= false;

coverage_notyet= false;
coverage_inprogress= false;
coverage_completed= false;

onAir_notyet= false;
onAir_inprogress= false;
onAir_completed= false;

constructor( private _sharedService: SharedService, private locService: LocationsService,private satService: StatusService,
  private router: Router ) {
  this._sharedService.emitChange(this.pageTitle);
  this.getLocations();
  this.getNewLocations();
  this.ngOnInit();
}

ngOnInit(): void {
  this.getLocations();
  this.getNewLocations();
}

getLocations(): void {
  this.satService
      .getLocations(this.vendor)
      .then(sat => this.status = sat);
}

getNewLocations(): void {
  this.satService
      .getNewLocations(this.vendor)
      .then(newsat => this.newstatus = newsat);
}

shownewdiv(t): void{
  if(t.target.checked){
    document.getElementById('newdiv').style.display = "block"    
   }
   else{
    document.getElementById('newdiv').style.display = "none"        
   }
}

check(): void{
  this.civil_notyet= false;
  this.civil_inprogress= false;
  this.civil_completed= false;
  
  this.coverage_notyet= false;
  this.coverage_inprogress= false;
  this.coverage_completed= false;
  
  this.onAir_notyet= false;
  this.onAir_inprogress= false;
  this.onAir_completed= false;
  if(this.selectedLocation.civil_status === "Not Yet"){
    this.civil_notyet=true;
  }
  else if(this.selectedLocation.civil_status === "In Progress"){
    this.civil_inprogress=true;

  }
  else{
    this.civil_completed=true;
  }

  if(this.selectedLocation.coverage_status === "Not Yet"){
    this.coverage_notyet=true;
  }
  else if(this.selectedLocation.coverage_status === "In Progress"){
    this.coverage_inprogress=true;

  }
  else{
    this.coverage_completed=true;
  }

  if(this.selectedLocation.onAir_status === "Not Yet"){
    this.onAir_notyet=true;
  }
  else if(this.selectedLocation.onAir_status === "In Progress"){
    this.onAir_inprogress=true;

  }
  else{
    this.onAir_completed=true;
  }
}

updateform(): void{
  var that = this;
  this.check();
  swal.withForm({
    title: 'Update '+that.location_title+' status:',
    showCancelButton: true,
    closeOnConfirm: false,
    showLoaderOnConfirm: true,
    confirmButtonText: 'Update',  
    formFields: [
      { id: 'civil_status',
        type: 'select',
        placeholder: 'Civil Status',
        label:'Civil Status:',
        options: [
          {value: 'Not Yet', text: 'Not Yet' ,selected:that.civil_notyet},
          {value: 'In Progress', text: 'In Progress',selected:that.civil_inprogress},
          {value: 'Completed', text: 'Completed',selected:that.civil_completed}
        ]},
        { id: 'coverage_status',
        type: 'select',
        placeholder: 'Coverage Status',
        label:'Coverage Status:',
        options: [
          {value: 'Not Yet', text: 'Not Yet' ,selected:that.coverage_notyet},
          {value: 'In Progress', text: 'In Progress',selected:that.coverage_inprogress},
          {value: 'Completed', text: 'Completed',selected:that.coverage_completed}
        ]},
        { id: 'onAir_status',
        type: 'select',
        placeholder: 'On Air Status',
        label:'On Air Status:',
        options: [
          {value: 'Not Yet', text: 'Not Yet' ,selected:that.onAir_notyet},
          {value: 'In Progress', text: 'In Progress',selected:that.onAir_inprogress},
          {value: 'Completed', text: 'Completed',selected:that.onAir_completed}
        ]}
    ]
  }, function (isConfirm) {
    if(isConfirm){  
    that.selectedLocation.civil_status= this.swalForm.civil_status;
    that.selectedLocation.coverage_status= this.swalForm.coverage_status;
    that.selectedLocation.onAir_status= this.swalForm.onAir_status;
    that.save();
  }}
)
}

onSelect(sat: Status,location_title): void {
  this.selectedLocation = sat;
  this.location_title = location_title;
}

save(): void {
  var counter = 0;
  this.satService.update(this.selectedLocation);
  for(counter;counter<10;counter++){
   this.ngOnInit(); 
  }
  setTimeout(function() {
    swal("Updated!", "Status location has been updated.", "success");}, 1000);
}

  }

