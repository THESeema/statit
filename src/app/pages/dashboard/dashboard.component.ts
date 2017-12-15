import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../layouts/shared-service';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as _ from "lodash";

import { AramcoLocation } from '../../services/AramcoLocation';
import { LocationsService } from '../../services/location.service';

@Component({
  moduleId: module.id,
  selector: 'page-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class PageDashboardComponent {
  pageTitle: string = 'Dashboard';
  locations: AramcoLocation[] = [];
  completedTowers: any = [];
  completedCov: any;

  private chart: any;
  chartData = [];
  civilChartArea = [];
  airChartArea = [];
  civilAllData = [];
  lat: number = 26.288769;
  lng: number = 50.114101;
  map: any = [];
  notyetMap: any = [];

  // Color scheme
  colorScheme = {
    domain: ['#d6e8ca', '#B3E5FC', '#a27ea8', '#aae3f5', '#a95963', '#50abcc']
  };

  totalCivilData: any = [];
  totalCoverageData: any = [];
  totalOnAirData: any = [];

  areaCoverageData: any = [
    {
      name: 'Completed',
      series: [
        {
          "name": String,
          "value": 0
        }
      ]
    },
    {
      name: 'Not Yet Started',
      series: [
        {
          "name": String,
          "value": 0
        }
      ]
    }
  ];

  constructor(private AmCharts: AmChartsService, private _sharedService: SharedService, private locService: LocationsService) {
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
      for (var j = 0; j < this.locations[i].status.length; j++) {
        if (this.locations[i].status[j].civil_status === "Completed"){
          this.map.push({ "lat": this.locations[i].lat, "lng": this.locations[i].long });
          break;
        }
        else if (this.locations[i].status[j].civil_status === "Not Yet Started"){
          this.notyetMap.push({ "lat": this.locations[i].lat, "lng": this.locations[i].long });
          break;
      }
    }
    }
console.log(this.map.length);
console.log(this.notyetMap.length);

    this.completedTowers = _.filter(this.locations, function (loc) {
      return _.some(loc.status, { 'civil_status': "Completed" });
    });

    let total = 0;
    for (var i = 0; i < this.locations.length; i++) {
      for (var j = 0; j < this.locations[i].status.length; j++) {
        if (this.locations[i].status[j].onAir_status === 'Completed')
          total++;
      }
    }

    this.completedCov = total;

    //console.log(this.locations);
    this.areaCoverageData[0].series.length = 0;
    this.areaCoverageData[1].series.length = 0;

    this.civilAll("STC");
    this.civilAll("Mobily");
    this.civilAll("Zain");



    var subareas = _.uniq(_.map(_.flatten(this.locations), function (e) {
      return e.sub_area;
    }));

    let towers, coverage, air;
    for (let entry of subareas) {

      towers = this.subareasChart(entry, "Completed", 'civil_status');
      coverage = this.subareasChart(entry, "Yes", 'coverage_status');
      air = this.subareasChart(entry, "Completed", 'onAir_status');

      let townName2;
      if (entry === "Dhahran" || entry === "Dhahran") {
        townName2 = entry;
      }

      this.chartData.push({
        'Towers': towers,
        'townName': entry,
        'townName2': townName2,
        // 'townSize': 25,
        'GSM SERVICE CELLS': coverage,
        'remaining': air
      });
    }

    var areas = _.uniq(_.map(_.flatten(this.locations), function (e) {
      return e.area;
    }));

    //civil & air based on area
    let done, notyet, under;
    for (let entry of areas) {

      done = this.areasChart(entry, "Completed", "civil_status");
      notyet = this.areasChart(entry, "Not Yet Started", "civil_status");
      under = this.areasChart(entry, "Existing", "civil_status");

      this.civilChartArea.push({
        'area': entry,
        'towers': done,
        'notyet': notyet,
        'under': under
      });

      done = this.areasChart(entry, "Completed", "onAir_status");
      notyet = this.areasChart(entry, "Not Yet Started", "onAir_status");
      under = this.areasChart(entry, "Existing", "onAir_status");

      this.airChartArea.push({
        'country': entry,
        'completed': done,
        'notyet': notyet,
        'undercon': under
      });

      this.dataIntoCharts_area(entry, "Yes", 0);
      this.dataIntoCharts_area(entry, "No", 1);
    }
    this.areaCoverageData = [...this.areaCoverageData];

    this.dataIntoCharts_total("Completed", "Completed");
    this.dataIntoCharts_total("Under Construction", "Existing");
    this.dataIntoCharts_total("Not Yet Started", "Not Yet Started");

    this.totalCivilData = [...this.totalCivilData];
    this.totalCoverageData = [...this.totalCoverageData];
    this.totalOnAirData = [...this.totalOnAirData];

    this.chart = this.AmCharts.makeChart('amchart-1', {
      'type': 'serial',
      'theme': 'light',

      'dataProvider': this.chartData,

      'addClassNames': true,
      'startDuration': 1,
      'categoryField': 'townName',
      'categoryAxis': {

        'autoGridCount': false,
        'gridCount': 50,
        'labelRotation': 90,
        'gridAlpha': 0.1,
        'gridColor': '#FFFFFF',
        'axisColor': '#555555',

      },
      'valueAxes': [{
        'id': 'a1',
        //'title': 'Towers',
        'gridAlpha': 0,
        'axisAlpha': 0
      }, {
        'id': 'a2',
        'position': 'right',
        'gridAlpha': 0,
        'axisAlpha': 0,
        'labelsEnabled': false
      }],
      'graphs': [{
        'id': 'g1',
        'valueField': 'Towers',
        'title': 'Civil Work ',
        'type': 'column',
        'fillAlphas': 0.9,
        'valueAxis': 'a1',
        'balloonText': '[[value]] towers',
        'legendValueText': '[[value]]',
        'legendPeriodValueText': 'total: [[value.sum]]',
        'lineColor': '#B3E5FC',
        'alphaField': 'alpha'
      }, {
        'id': 'g3',
        'valueField': 'GSM SERVICE CELLS',
        'classNameField': 'bulletClass',
        'title': 'Coverage',
        'type': 'line',
        'valueAxis': 'a2',
        'lineColor': '#d50000',
        'lineThickness': 1,
        'legendValueText': '[[value]]',
        'legendPeriodValueText': 'total: [[value.sum]]',
        'descriptionField': 'townName',
        'bullet': 'round',
        'bulletSizeField': 'townSize',
        'bulletBorderColor': '#ca0000',
        'bulletBorderAlpha': 1,
        'bulletBorderThickness': 2,
        'bulletColor': '#f2b3b3',
        'labelText': '[[townName2]]',
        'labelPosition': 'right',
        'balloonText': 'Completed:[[value]]',
        'showBalloon': true,
        'animationPlayed': true
      }, {
        'id': 'g2',
        'title': 'On Air',
        'valueField': 'remaining',

        'type': 'line',
        'valueAxis': 'a3',
        'lineColor': '#64B5F6',
        'balloonText': '[[value]]',

        'lineThickness': 1,
        'legendValueText': '[[value]]',
        'legendPeriodValueText': 'total: [[value.sum]]',
        'bullet': 'square',
        'bulletBorderColor': '#64B5F6',
        'bulletBorderThickness': 1,
        'bulletBorderAlpha': 1,
        'dashLengthField': 'dashLength',
        'animationPlayed': true
      }],
      'chartCursor': {
        'zoomable': false,
        'cursorAlpha': 0,
        'valueBalloonsEnabled': false
      },
      'legend': {
        'bulletType': 'round',
        'equalWidths': false,
        'valueWidth': 120,
        'align': 'center',
        'useGraphSettings': true
      }
    });


    this.chart = this.AmCharts.makeChart('amchart-6', {
      'type': 'serial',
      'addClassNames': true,
      'theme': 'light',

      'balloon': {
        'adjustBorderColor': false,
        'horizontalPadding': 10,
        'verticalPadding': 8,
        'color': '#ffffff'
      },

      'dataProvider': this.civilChartArea,

      'valueAxes': [{
        'axisAlpha': 0,
        'position': 'left'
      }],
      'startDuration': 1,
      'graphs': [{
        'alphaField': 'alpha',
        'balloonText': '<span style="font-size:12px;">[[title]] in [[category]]:<br><span style="font-size:20px;">[[value]]</span> [[additional]]</span>',
        'fillAlphas': 1,
        'title': 'completed towers',
        'type': 'column',
        'valueField': 'towers',
        'dashLengthField': 'dashLengthColumn'
      }, {
        'id': 'graph2',
        'balloonText': '<span style="font-size:12px;">[[title]] in [[category]]:<br><span style="font-size:20px;">[[value]]</span> [[additional]]</span>',
        'bullet': 'round',
        'lineThickness': 3,
        'bulletSize': 7,
        'bulletBorderAlpha': 1,
        'bulletColor': '#FFFFFF',
        'useLineColorForBulletBorder': true,
        'bulletBorderThickness': 3,
        'fillAlphas': 0,
        'lineAlpha': 1,
        'title': 'remaining towers',
        'valueField': 'notyet',
        'dashLengthField': 'dashLengthLine'
      }, {
        'id': 'graph3',
        'balloonText': '<span style="font-size:12px;">[[title]] in [[category]]:<br><span style="font-size:20px;">[[value]]</span> [[additional]]</span>',
        'bullet': 'round',
        'lineThickness': 3,
        'bulletSize': 7,
        'bulletBorderAlpha': 1,
        'bulletColor': '#FFFFFF',
        'useLineColorForBulletBorder': true,
        'bulletBorderThickness': 3,
        'fillAlphas': 0,
        'lineAlpha': 1,
        'title': 'under construction towers',
        'valueField': 'under',
        'dashLengthField': 'dashLengthLine'
      }
      ],
      'categoryField': 'area',
      'categoryAxis': {
        'gridPosition': 'start',
        'axisAlpha': 0,
        'tickLength': 0
      }
    });

    this.chart = this.AmCharts.makeChart("amchart-7", {
      "type": "serial",
      "rotate": true,
      "theme": "light",
      "autoMargins": false,
      "marginTop": 30,
      "marginLeft": 80,
      "marginBottom": 30,
      "marginRight": 50,

      "dataProvider": this.civilAllData,

      "valueAxes": [{
        "maximum": this.locations.length,
        "stackType": "regular",
        "gridAlpha": 0
      }],
      "startDuration": 1,
      "graphs": [{
        "valueField": "full",
        "showBalloon": false,
        "type": "column",
        "lineAlpha": 0,
        "fillAlphas": 0.8,
        "fillColors": ['#d6e8ca', '#B3E5FC', '#a27ea8', '#aae3f5'],
        "gradientOrientation": "horizontal",
      }, {
        "clustered": false,
        "columnWidth": 0.3,
        "fillAlphas": 1,
        "lineColor": "#000000",
        "stackable": false,
        "type": "column",
        "valueField": "bullet"
      }, {
        "columnWidth": 0.5,
        "lineColor": "#000000",
        "lineThickness": 3,
        "noStepRisers": true,
        "stackable": false,
        "type": "step",
        "valueField": "limit"
      }],
      "columnWidth": 1,
      "categoryField": "category",
      "categoryAxis": {
        "gridAlpha": 0,
        "position": "left"
      }
    });

    this.chart = this.AmCharts.makeChart('amchart-8', {
      'type': 'radar',
      'theme': 'light',
      'dataProvider': this.airChartArea,

      'valueAxes': [{
        'axisTitleOffset': 20,
        'minimum': 0,
        'axisAlpha': 0.15
      }],
      'startDuration': 2,
      'graphs': [{
        'balloonText': '[[value]] On Air Completed',
        'bullet': 'round',
        'lineThickness': 1,
        'valueField': 'completed'
      },
      {
        'balloonText': '[[value]] On Air Remaining',
        'bullet': 'round',
        'lineThickness': 1,
        'valueField': 'notyet'
      },
      {
        'balloonText': '[[value]] On Air Under Construction',
        'bullet': 'round',
        'lineThickness': 1,
        'valueField': 'undercon'
      }],
      'categoryField': 'country'

    });



  }
  civilAll(providor) {
    var assigned = _.filter(this.locations, { assigned_to: providor });

    var prov = _.filter(assigned, function (loc) {
      return _.some(loc.status, { 'civil_status': 'Completed' });
    });
    this.civilAllData.push({
      "category": providor,
      "limit": assigned.length,
      "full": this.locations.length,
      "bullet": prov.length
    });
  }

  areasChart(area, stat, type) {
    let total = 0;
    if (type === "civil_status") {
      for (var i = 0; i < this.locations.length; i++) {
        for (var j = 0; j < this.locations[i].status.length; j++) {
          if (this.locations[i].area === area && this.locations[i].status[j].civil_status === stat)
            total++;
        }
      }
    }
    else {
      for (var i = 0; i < this.locations.length; i++) {
        for (var j = 0; j < this.locations[i].status.length; j++) {
          if (this.locations[i].area === area && this.locations[i].status[j].onAir_status === stat)
            total++;
        }
      }

    }
    return total;
  }
  //based on total
  dataIntoCharts_total(lable, stat) {
    var cov = "";
    let totalcivil = 0;
    for (var i = 0; i < this.locations.length; i++) {
      for (var j = 0; j < this.locations[i].status.length; j++) {
        if (this.locations[i].status[j].civil_status === stat)
          totalcivil++;
      }
    }
    this.totalCivilData.push({ "name": lable, "value": totalcivil });

    if (stat === "Completed" || stat === "Not Yet Started") {
      if (stat === "Completed")
        cov = "Yes";
      else
        cov = "No";
      let totalcoverage = 0;
      for (var i = 0; i < this.locations.length; i++) {
        for (var j = 0; j < this.locations[i].status.length; j++) {
          if (this.locations[i].status[j].coverage_status === cov)
            totalcoverage++;
        }
      }
      this.totalCoverageData.push({ "name": lable, "value": totalcoverage });
    }
    let totalair = 0;
    for (var i = 0; i < this.locations.length; i++) {
      for (var j = 0; j < this.locations[i].status.length; j++) {
        if (this.locations[i].status[j].onAir_status === stat)
          totalair++;
      }
    }
    this.totalOnAirData.push({ "name": lable, "value": totalair });
  }
  //based on area
  dataIntoCharts_area(area, stat, ndx) {
    let total = 0;
    for (var i = 0; i < this.locations.length; i++) {
      for (var j = 0; j < this.locations[i].status.length; j++) {
        if (this.locations[i].area === area && this.locations[i].status[j].coverage_status === stat)
          total++;
      }
    }
    this.areaCoverageData[ndx].series.push({ "name": area, "value": total });
  }

  subareasChart(subarea, stat, type) {
    let total = 0;
    if (type === "civil_status") {
      for (var i = 0; i < this.locations.length; i++) {
        for (var j = 0; j < this.locations[i].status.length; j++) {
          if (this.locations[i].sub_area === subarea && this.locations[i].status[j].civil_status === stat)
            total++;
        }
      }
    }
    else if (type === "coverage_status") {
      for (var i = 0; i < this.locations.length; i++) {
        for (var j = 0; j < this.locations[i].status.length; j++) {
          if (this.locations[i].sub_area === subarea && this.locations[i].status[j].coverage_status === stat)
            total++;
        }
      }
    }
    else {
      for (var i = 0; i < this.locations.length; i++) {
        for (var j = 0; j < this.locations[i].status.length; j++) {
          if (this.locations[i].sub_area === subarea && this.locations[i].status[j].onAir_status === stat)
            total++;
        }
      }
    }

    return total;
  }

  ngOnInit() {

    this.getlocations();



  }

  //Doughnut
  public doughnutChartLabels: string[] = [
    '',
    '',
    ''
  ];
  public doughnutChartData: number[] = [
    350,
    450,
    100
  ];
  public doughnutChartColors: any[] = [
    {
      backgroundColor: [
        "#778391",
        "#ff8c00",
        "#3c4e62"
      ],
    }
  ];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartOptions: any = {
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    tooltips: false
  };

  // Pie
  public pieChartLabels: string[] = [
    '',
    '',
    ''
  ];
  public pieChartData: any[] = [
    300,
    500,
    100
  ];
  public pieChartColors: any[] = [
    {
      backgroundColor: [
        "#778391",
        "#5dade0",
        "#3c4e62"
      ],
    }
  ];
  public pieChartType: string = 'pie';
  public pieChartOptions: any = {
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    tooltips: false
  };
}