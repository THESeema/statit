import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../layouts/shared-service';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import * as _ from "lodash";

import { AramcoLocation } from '../../../services/AramcoLocation';
import { LocationsService } from '../../../services/location.service';

@Component({
  selector: 'shared-progress',
  templateUrl: './shared-progress.component.html',
  styleUrls: ['./shared-progress.component.scss']
})
export class PagesharedComponent implements OnInit {
  vendor = JSON.parse(localStorage.getItem('currentUser')).username;    
  
  pageTitle: string = this.vendor;
  location: any[] = [];
  assigned: any = [];
  subAreaOnAirData: any = [];
  stc: any = [];
  private chart: any;
  civilData = [];
  coverageData = [];

  colorScheme = {
    domain: ['#d6e8ca', '#B3E5FC', '#a27ea8', '#aae3f5', '#a95963', '#50abcc']
  };


  constructor(private AmCharts: AmChartsService, private _sharedService: SharedService, private locService: LocationsService) {
    this._sharedService.emitChange(this.pageTitle);
  }

  //-------------------------------based on area
  //civil chart
  public lineChartData: Array<any> = [
    { data: [], label: 'Completed' },
    { data: [], label: 'Under Construction' },
    { data: [], label: 'Not Yet Started' }
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: any[] = [{
    backgroundColor: 'rgba(255,116,19,0.2)',
    borderColor: 'rgba(255,116,19,1)',
    pointBackgroundColor: 'rgba(255,116,19,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(255,116,19,0.8)'
  },
  {
    backgroundColor: 'rgba(225,122,180,0.2)',
    borderColor: 'rgba(225,122,180,1)',
    pointBackgroundColor: 'rgba(225,122,180,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(225,122,180,1)'
  },
  {
    backgroundColor: 'rgba(145,55,63,0.2)',
    borderColor: 'rgba(145,55,63,1)',
    pointBackgroundColor: 'rgba(145,55,63,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(145,55,63,0.8)'
  }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';


  //on air chart
  public on_airChartData: Array<any> = [
    { data: [], label: 'Completed' },
    { data: [], label: 'Under Construction' },
    { data: [], label: 'Not Yet Started' }
  ];
  public on_airChartLabels: Array<any> = [];

  //coverage chart
  public barChartData: Array<any> = [
    { data: [], label: 'Completed' },
    { data: [], label: 'Not Yet Started' }
  ];
  public barChartLabels: Array<any> = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;



  //-------------------------------based on total
  public ChartLabels: string[] = [
    'Completed',
    'Under Construction',
    'Not Yet Started'
  ];
  public CovChartLabels: string[] = [
    'Completed',
    'Not Yet Started'
  ];
  //civil chart
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartColors: any[] = [
    {
      backgroundColor: [
        "#FEA1B4",
        "#FEE299",
        "#69C3FF"
      ],
    }
  ];


  // coverage chart
  public polarAreaChartData: number[] = [];

  // on air chart
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';

  getstatus(): void {
    this.locService
      .getData()
      .subscribe(data => {
        this.location = data;

        this.manipulateData();
      });
  }

  manipulateData() {
    this.assigned = _.filter(this.location, { assigned_to: this.vendor });

    for (var i = 0; i < this.location.length; i++) {
      for (var j = 0; j < this.location[i].status.length; j++) {
        if (this.location[i].status[j].operator === this.vendor)
          this.stc.push({ "sub": this.location[i].sub_area, "name": this.location[i].location_title, "civil": this.location[i].status[j].civil_status, "coverage": this.location[i].status[j].coverage_status, "air": this.location[i].status[j].onAir_status });
      }
    }

    var subareas = _.uniq(_.map(_.flatten(this.location), function (e) {
      return e.sub_area;
    }));

    let done, notyet, inprog;
    for (let entry of subareas) {

      done = this.civilStatus(entry, "Completed");
      notyet = this.civilStatus(entry, "Not Yet Started");
      inprog = this.civilStatus(entry, "Existing");

      this.civilData.push({
        "subarea": entry,
        "done": done.length,
        "notyet": notyet.length,
        "inprog": inprog.length
      });

      done = this.coverStatus(entry, "Yes");
      notyet = this.coverStatus(entry, "No");

      this.coverageData.push({

        'townName': entry,
        'completed': done.length,
        'notyet': notyet.length

      });
    }

    var areas = _.uniq(_.map(_.flatten(this.location), function (e) {
      return e.area;
    }));

    //update based on area charts
    for (let entry of areas) {
      this.dataIntoCharts_area(entry, "Completed", 0);
      this.dataIntoCharts_area(entry, "Existing", 1);
      this.dataIntoCharts_area(entry, "Not Yet Started", 2);

      this.lineChartLabels.push(entry.toUpperCase());
      this.barChartLabels.push(entry.toUpperCase());
      this.on_airChartLabels.push(entry.toUpperCase());

    };

    this.lineChartData = [...this.lineChartData];
    this.barChartData = [...this.barChartData];
    this.on_airChartData = [...this.on_airChartData];

    //update based on total charts
    this.dataIntoCharts_total("Completed");
    this.dataIntoCharts_total("Existing");
    this.dataIntoCharts_total("Not Yet Started");

    this.doughnutChartData = [...this.doughnutChartData];
    this.polarAreaChartData = [...this.polarAreaChartData];
    this.pieChartData = [...this.pieChartData];

    //update based on sub area
    var subs = _.uniq(_.map(_.flatten(this.location), function (e) {
      return e.sub_area;
    }));

    for (let i = 0; i < subs.length; i++) {
      this.subAreaOnAirData.push({ "name": subs[i], "series": [] });
      this.dataIntoCharts_sub(subs[i], "Completed", i);
      this.dataIntoCharts_sub(subs[i], "Existing", i);
      this.dataIntoCharts_sub(subs[i], "Not Yet Started", i);
    }
    this.subAreaOnAirData = [...this.subAreaOnAirData];

    this.chart = this.AmCharts.makeChart("amchart-7", {
      "theme": "light",
      "type": "serial",
      "dataProvider": this.civilData,

      "valueAxes": [{
        "position": "left",
      }],
      "startDuration": 1,
      "graphs": [{
        "balloonText": "Completed Towers in [[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.9,
        "lineAlpha": 0.2,
        "title": "2004",
        "type": "column",
        "valueField": "done"
      }, {
        "balloonText": "Not Yet Started Towers in [[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.9,
        "lineAlpha": 0.2,
        "title": "2005",
        "type": "column",
        "clustered": false,
        "columnWidth": 0.5,
        "valueField": "notyet"
      },
      {
        "balloonText": "Under Construction Towers in [[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.9,
        "lineAlpha": 0.2,
        "title": "2005",
        "type": "column",
        "clustered": false,
        "columnWidth": 0.3,
        "valueField": "inprog"
      }],
      "plotAreaFillAlphas": 0.1,
      "categoryField": "subarea",
      "categoryAxis": {
        "gridPosition": "start",
        'labelRotation': 90
      },
      "export": {
        "enabled": true
      }

    });



    this.chart = this.AmCharts.makeChart("amchart-3", {
      "type": "serial",
      "theme": "light",

      "fontFamily": "Lato",
      "autoMargins": true,
      "addClassNames": true,
      "zoomOutText": "",
      "defs": {
        "filter": [
          {
            "x": "-50%",
            "y": "-50%",
            "width": "200%",
            "height": "200%",
            "id": "blur",
            "feGaussianBlur": {
              "in": "SourceGraphic",
              "stdDeviation": "50"
            }
          },
          {
            "id": "shadow",
            "width": "150%",
            "height": "150%",
            "feOffset": {
              "result": "offOut",
              "in": "SourceAlpha",
              "dx": "2",
              "dy": "2"
            },
            "feGaussianBlur": {
              "result": "blurOut",
              "in": "offOut",
              "stdDeviation": "10"
            },
            "feColorMatrix": {
              "result": "blurOut",
              "type": "matrix",
              "values": "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .2 0"
            },
            "feBlend": {
              "in": "SourceGraphic",
              "in2": "blurOut",
              "mode": "normal"
            }
          }
        ]
      },
      "fontSize": 15,
      "pathToImages": "../amcharts/images/",
      "dataProvider": this.coverageData,
      "marginTop": 0,
      "marginRight": 1,
      "marginLeft": 0,
      "autoMarginOffset": 5,
      'categoryField': 'townName',
      'categoryAxis': {
        'gridPosition': 'start',
        'autoGridCount': false,
        'gridCount': 50,
        'labelRotation': 90,
        'axisAlpha': 0,
        'tickLength': 0
      },
      "valueAxes": [
        {
          "ignoreAxisWidth": true,
          "stackType": "regular",
          "gridAlpha": 0.07,
          "axisAlpha": 0,
          "inside": true
        }
      ],
      "graphs": [
        {
          "id": "g1",
          "type": "line",
          "valueField": "completed",
          "fillColors": [
            "#0066e3",
            "#802ea9"
          ],
          "lineAlpha": 0,
          "fillAlphas": 0.8,
          "showBalloon": false
        },
        {
          "id": "g2",
          "type": "line",
          "valueField": "notyet",
          "lineAlpha": 0,
          "fillAlphas": 0.8,
          "lineColor": "#5bb5ea",
          "showBalloon": false
        },
        {
          "id": "g3",
          "title": "Completed",
          "valueField": "completed",
          "lineAlpha": 0.5,
          "lineColor": "#FFFFFF",
          "bullet": "round",
          "dashLength": 2,
          "bulletBorderAlpha": 1,
          "bulletAlpha": 1,
          "bulletSize": 15,
          "stackable": false,
          "bulletColor": "#5d7ad9",
          "bulletBorderColor": "#FFFFFF",
          "bulletBorderThickness": 3,
          "balloonText": "<div style='margin-bottom:30px;text-shadow: 2px 2px rgba(0, 0, 0, 0.1); font-weight:200;font-size:30px; color:#ffffff'>[[value]]</div>"
        },
        {
          "id": "g4",
          "title": "Not Yet Started",
          "valueField": "notyet",
          "lineAlpha": 0.5,
          "lineColor": "#FFFFFF",
          "bullet": "round",
          "dashLength": 2,
          "bulletBorderAlpha": 1,
          "bulletAlpha": 1,
          "bulletSize": 10,
          "stackable": false,
          "bulletColor": "#8d83c8",
          "bulletBorderColor": "#FFFFFF",
          "bulletBorderThickness": 3,
          "balloonText": "<div style='margin-bottom:30px;text-shadow: 2px 2px rgba(0, 0, 0, 0.1); font-weight:200;font-size:30px; color:#ffffff'>[[value]]</div>"
        }
      ],
      "chartCursor": {
        "cursorAlpha": 1,
        "zoomable": false,
        "cursorColor": "#FFFFFF",
        "categoryBalloonColor": "#8d83c8",
        "fullWidth": true,
        "categoryBalloonDateFormat": "YYYY",
        "balloonPointerOrientation": "vertical"
      },
      "balloon": {
        "borderAlpha": 0,
        "fillAlpha": 0,
        "shadowAlpha": 0,
        "offsetX": 40,
        "offsetY": -50
      },
      'legend': {
        'bulletType': 'round',
        'equalWidths': false,
        'valueWidth': 150,
        'useGraphSettings': true
      }
    });

  }

  civilStatus(subarea, stat) {
        return _.filter(this.stc, { "sub": subarea, "civil": stat });
      }
      coverStatus(subarea, stat) {
        return _.filter(this.stc, { "sub": subarea, "coverage": stat });
      }

  //based on sub area
  dataIntoCharts_sub(sub, stat, ndx) {
    var total = _.filter(this.stc, { sub: sub, air: stat });
    this.subAreaOnAirData[ndx].series.push({ "name": stat, "value": total.length });
  }

  //based on area
  dataIntoCharts_area(area, stat, ndx) {
    var cov = "";
    var civil = _.filter(this.location, function (loc) {
      return _.some(loc.area === area && loc.status, { 'civil_status': stat, 'operator': this.vendor });
    });
    this.lineChartData[ndx]['data'].push(civil.length);
    if (ndx === 0 || ndx === 1) {
      if (stat === "Completed")
        cov = "Yes";
      else
        cov = "No";
      var coverage = _.filter(this.location, function (loc) {
        return _.some(loc.area === area && loc.status, { 'coverage_status': cov, 'operator': this.vendor });
      });
      this.barChartData[ndx]['data'].push(coverage.length);
    }
    var onair = _.filter(this.location, function (loc) {
      return _.some(loc.area === area && loc.status, { 'onAir_status': stat, 'operator': this.vendor });
    });
    this.on_airChartData[ndx]['data'].push(onair.length);

  }

  //based on total
  dataIntoCharts_total(stat) {
    var cov = "";
    var civil = _.filter(this.location, function (loc) {
      return _.some(loc.status, { 'civil_status': stat, 'operator': this.vendor });
    });
    this.doughnutChartData.push(civil.length);
    if (stat === "Completed" || stat === "Not Yet Started") {
      if (stat === "Completed")
        cov = "Yes";
      else
        cov = "No";
      var coverage = _.filter(this.location, function (loc) {
        return _.some(loc.status, { 'coverage_status': cov, 'operator': this.vendor });
      });
      this.polarAreaChartData.push(coverage.length);
    }
    var onair = _.filter(this.location, function (loc) {
      return _.some(loc.status, { 'onAir_status': stat, 'operator': this.vendor });
    });
    this.pieChartData.push(onair.length);

  }

  ngOnInit() {
    this.getstatus();


  }


}
