import { Component, OnInit } from '@angular/core';
import {CsvManagerService} from '../../../../services/csv-manager.service';
import {Chart} from 'chart.js';
import {DataResultsService} from '../../../../services/data-results.service';
import {ChartsService} from '../../../../services/charts.service';

@Component({
  selector: 'app-interset-err-chart',
  templateUrl: './interset-err-chart.component.html',
  styleUrls: ['./interset-err-chart.component.sass']
})
export class IntersetErrChartComponent implements OnInit {

  constructor(public data: DataResultsService, public csvManager: CsvManagerService, public chart: ChartsService) { }

  ngOnInit() {
    this.chart.chartInterset = this.getElemPerSetChart('intersetErrors');
  }

  getElemPerSetChart(ctx) {
    const setsLabels = this.data.area;
    const dataset1 = this.data.aPrioriIsep;
    const dataset2 = this.data.isep;
    const dataset3 = this.data.isepr;

    return new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: setsLabels,
        datasets: [{
          label: 'A priori ISEP',
          borderColor: 'rgb(255, 0, 0)',
          borderWidth: 1,
          fill: false,
          data: dataset1,
          pointRadius: 0,
          pointStyle: 'line'
        },
          {
            type: 'line',
            label: 'ISEP',
            borderColor: 'rgb(14, 121, 163)',
            borderWidth: 1,
            fill: false,
            data: dataset2,
            pointRadius: 0,
            pointStyle: 'line'
          },
          {
            type: 'line',
            label: 'ISER',
            borderColor: 'rgb(0, 100, 0)',
            borderWidth: 1,
            fill: false,
            data: dataset3,
            pointRadius: 0,
            pointStyle: 'line'
          }]
      },

      // Configuration options go here
      options: {
        responsive: true,
        legend: {
          labels: {
            usePointStyle: true
          }
        },
        title: {
          display: true,
          text: 'Inter-set errors'
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Set'
            },
            ticks: {
              callback: (value, index, values) => {
                if (value % 50 === 0) {
                  return value;
                }
              },
              autoSkip: false
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'ISEP'
            },
            ticks: {
              min : 0.0000,
              stepSize: 0.0025
            }
          }]
        }
      }
    });
  }
}
