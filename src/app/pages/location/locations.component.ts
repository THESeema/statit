

import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../layouts/shared-service';
import { Router }              from '@angular/router';
import { AramcoLocation }        from '../../services/AramcoLocation';
import { LocationsService } from '../../services/location.service';
import { StatusService } from '../../services/status.service';
declare var swal: any;

@Component({
  moduleId: module.id,
  selector: 'page-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class PageLocationsComponent implements OnInit {
pageTitle: string = 'Aramco Locations';
locations: AramcoLocation[]=[];
selectedLocation: AramcoLocation;
assigned_to_selected;
stcselected= false;
zainselected= false;
mobilyselected= false;

constructor( private _sharedService: SharedService, private locService: LocationsService, private satService: StatusService,
  private router: Router ) {
  this._sharedService.emitChange(this.pageTitle);
  this.getlocations();
  this.ngOnInit();
}

ngOnInit(): void {
  this.getlocations();
  }

getlocations(): void {
  this.locService
      .getlocations()
      .then(locs => this.locations = locs);
}

addform(): void{
  var that = this;
  swal.withForm({
    title: 'Add new location:',
    showCancelButton: true,
    closeOnConfirm: false,
    showLoaderOnConfirm: true,
    confirmButtonText: 'Add',  
    formFields: [
      { id: 'area', placeholder: 'Area' ,required: true },
      { id: 'subarea', placeholder: 'Sub Area' ,required: true },
      { id: 'location_title', placeholder: 'Location name' ,required: true },
      { id: 'assigned_to',
        type: 'select',
        placeholder: 'Assigned to',
        required: true,
        options: [
          {value: 'Assigned_to', text: 'Assigned to'},
          {value: 'STC', text: 'STC'},
          {value: 'Zain', text: 'Zain'},
          {value: 'Mobily', text: 'Mobily'}
        ]}
    ]
  }, function (isConfirm) {
    if(isConfirm){
    that.add(this.swalForm.area,this.swalForm.subarea,this.swalForm.location_title,this.swalForm.assigned_to)
  }}
)
}

editform(): void{
  var that = this;
  that.stcselected= false;
  that.zainselected= false;
  that.mobilyselected= false;
  if(that.selectedLocation.assigned_to === "STC"){
    that.stcselected=true;
  }
  else if(that.selectedLocation.assigned_to === "Zain"){
    that.zainselected=true;
  }
  else{
    that.mobilyselected=true;
  }
  swal.withForm({
    title: 'Edit '+that.selectedLocation.location_title+' location:',
    showCancelButton: true,
    closeOnConfirm: false,
    showLoaderOnConfirm: true,
    confirmButtonText: 'Edit',  
    formFields: [
      { id: 'area', placeholder: 'Area' ,value: that.selectedLocation.area },
      { id: 'subarea', placeholder: 'Sub Area' ,value: that.selectedLocation.sub_area },
      { id: 'location_title',placeholder: 'Location name' ,value: that.selectedLocation.location_title },
      { id: 'assigned_to',
        type: 'select',
        placeholder: 'Assigned to',
        options: [
          {value: 'STC', text: 'STC' ,selected:that.stcselected},
          {value: 'Zain', text: 'Zain',selected:that.zainselected},
          {value: 'Mobily', text: 'Mobily',selected:that.mobilyselected}
        ]}
    ]
  }, function (isConfirm) {
    if(isConfirm){  
    that.selectedLocation.area= this.swalForm.area;
    that.selectedLocation.sub_area= this.swalForm.subarea;
    that.selectedLocation.location_title= this.swalForm.location_title;
    that.selectedLocation.assigned_to= this.swalForm.assigned_to;
    that.save();
  }}
)
}

add(area: string,sub_area: string,location_title: string,assigned_to: string): void {
  var counter = 0;
  this.locService.create(area,sub_area,location_title,assigned_to);
  for(counter;counter<10;counter++){
   this.ngOnInit(); 
  }
     var that = this;
  setTimeout(function() {
    that.addstatus();
    swal("Added!", "Your location has been added.", "success");
    document.getElementById('add').scrollIntoView(); }, 5000);
}

addstatus(): void{
  var that = this;
  this.satService.create((this.locations[this.locations.length -1].id),"STC","Not Yet","Not Yet","Not Yet");
  setTimeout(
    that.satService.create((this.locations[this.locations.length -1].id),"Zain","Not Yet","Not Yet","Not Yet")
  , 1000);
  setTimeout(
    that.satService.create((this.locations[this.locations.length -1].id),"Mobily","Not Yet","Not Yet","Not Yet")
  , 3000);
}


delete(loc: AramcoLocation,id1: number,id2: number,id3: number): void {
  var that = this;
  swal({
    title: "Are you sure to delete?",
    text: "This location: "+loc.location_title,
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    closeOnConfirm: false,
    showLoaderOnConfirm: true,
  }, function(){
    that.satService.delete(id1);
    that.satService.delete(id2);
    that.satService.delete(id3);
    setTimeout(function() {
      that.locService
      .delete(loc.id)
      .then(() => {
        that.locations = that.locations.filter(h => h !== loc);
        if (that.selectedLocation === loc) { that.selectedLocation = null; }
      })
   , swal("Deleted!","Your location has been deleted.","success");
    }, 5000);
  },
);
}

onSelect(loc: AramcoLocation): void {
  this.selectedLocation = loc;
}

save(): void {
  this.locService.update(this.selectedLocation);
  setTimeout(function() {
    swal("Edited!", "Your location has been edited.", "success");}, 1000);
}

  }

