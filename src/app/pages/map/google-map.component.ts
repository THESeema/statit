import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../layouts/shared-service';

import { AramcoLocation } from '../../services/AramcoLocation';
import { LocationsService } from '../../services/location.service';

@Component({
  selector: 'page-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class PageGoogleMapComponent implements OnInit {
  pageTitle: string = 'Aramco Locations';
  locations: AramcoLocation[] = [];
  map: any = [];
  lat: number = 25;
  lng: number = 45;

  constructor(private _sharedService: SharedService, private locService: LocationsService) {
    this._sharedService.emitChange(this.pageTitle);
  }
  getlocations(): void {
    this.locService
      .getData()
      .subscribe(data => {
        this.locations = data;

        this.manipulateData();
      });
  }

  manipulateData() {

    for (var i = 0; i < this.locations.length; i++) {

      this.map.push({ "lat": this.locations[i].lat, "lng": this.locations[i].long });
    }
  }

  ngOnInit() {
    this.getlocations();
  }
}
