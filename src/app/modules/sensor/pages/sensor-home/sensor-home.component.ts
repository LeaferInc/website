import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartDataSets, ChartPoint } from 'chart.js';
import 'hammerjs';
import 'chartjs-plugin-zoom';
import { addMinutes } from 'date-fns';

@Component({
  selector: 'app-sensor-home',
  templateUrl: './sensor-home.component.html',
  styleUrls: ['./sensor-home.component.scss'],
})
export class SensorHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chart') chartRef: ElementRef<HTMLCanvasElement>;

  private chart: Chart = null;

  private first_dataset: ChartDataSets = {
    label: '[First] test',
    data: this.generateDate(),
    fill: false,
  };

  private second_dataset: ChartDataSets = {
    label: '[Second] test',
    data: this.generateDate(),
    fill: false,
  };

  private generateDate(): ChartPoint[] {
    let arr: ChartPoint[] = [];
    let date = new Date(2020, 1, 1, 10, 0);
    for (let index = 0; index < 500; index++) {
      arr.push({
        x: date = addMinutes(date, 10),
        y: Math.floor(Math.random() * Math.floor(15))
      });
    }
    return arr;
  }

  constructor() {}

  // private date: Date = new Date(2020, 1, 1, 10, 30);
  // private interval: NodeJS.Timeout = null;

  ngOnInit(): void {
    // this.interval = setInterval(() => {
    //   const point: ChartPoint = {
    //     x: this.date = addMinutes(this.date, 10),
    //     y: Math.floor(Math.random() * Math.floor(15))
    //   };
    //   (this.chart.data.datasets[0].data as ChartPoint[]).push(point);
    //   this.chart.update();
    // }, 5000);
  }

  ngOnDestroy() {
    // clearInterval(this.interval);
  }

  ngAfterViewInit() {
    const ctx = this.chartRef.nativeElement;

    const first_data: ChartData = {
      datasets: [this.first_dataset, this.second_dataset],
    };

    this.chart = new Chart(ctx, {
      type: 'line',
      data: first_data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 0,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'minute',
                // displayFormats: {
                //   millisecond: 'MMM DD',
                //   second: 'MMM DD',
                //   minute: 'MMM DD',
                //   hour: 'MMM DD',
                //   day: 'MMM DD',
                //   week: 'MMM DD',
                //   month: 'MMM DD',
                //   quarter: 'MMM DD',
                //   year: 'MMM DD',
                // },
              },
            },
          ],
        },
        plugins: {
          zoom: {
            pan: {
              // Boolean to enable panning
              enabled: true,
              // Panning directions
              mode: 'x',
              // Format of min pan range depends on scale type
              rangeMin: {
                x: null,
                y: null
              },
              // Format of max pan range depends on scale type
              rangeMax: {
                x: null,
                y: null
              },
              // On category scale, factor of pan velocity
              speed: 20,
              // Minimal pan distance required before actually applying pan
              threshold: 10,
              // Function called while the user is panning
              onPan: function ({ chart }) {
                console.log(`I'm panning!!!`, chart);
              },
              // Function called once panning is completed
              onPanComplete: function ({ chart }) {
                console.log(`I was panned!!!`, chart);
              },
            },
            zoom: {
              // Boolean to enable zooming
              enabled: true,
              // Enable drag-to-zoom behavior
              drag: false,
              // Zooming directions. Remove the appropriate direction to disable
              mode: 'x',
              // Format of min zoom range depends on scale type
              rangeMin: {
                x: null,
                y: null
              },
              // Format of max zoom range depends on scale type
              rangeMax: {
                x: null,
                y: null
              },
              // Speed of zoom via mouse wheel
              // (percentage of zoom on a wheel event)
              speed: 0.1,
              // Minimal zoom distance required before actually applying zoom
              threshold: 2,
              // On category scale, minimal zoom level before actually applying zoom
              sensitivity: 3,
              // Function called while the user is zooming
              onZoom: function ({ chart }) {
                console.log(`I'm zooming!!!`, chart);
              },
              // Function called once zooming is completed
              onZoomComplete: function ({ chart }) {
                console.log(`I was zoomed!!!`, chart);
              },
            },
          },
        },
      },
    });
  }
}
