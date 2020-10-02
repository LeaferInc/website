import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Chart, ChartDataSets, ChartPoint } from 'chart.js';
import 'hammerjs';
import 'chartjs-plugin-zoom';
import { SensorDataService } from 'src/app/core/services/sensor-data/sensor-data.service';
import { groupBy, values } from 'lodash';
import { parseISO } from 'date-fns';
import { merge, Subscription } from 'rxjs';
import { SensorDataSocketService } from 'src/app/core/services/sensor-data-socket/sensor-data-socket.service';
import { switchMap } from 'rxjs/operators';
import { SensorData } from 'src/app/shared/models/sensor-data/sensor-data';

@Component({
  selector: 'app-sensor-home',
  templateUrl: './sensor-home.component.html',
  styleUrls: ['./sensor-home.component.scss'],
})
export class SensorHomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('canvasList') canvasList: ElementRef<HTMLElement>;

  private charts: Map<number, Chart> = new Map();
  private sub: Subscription = new Subscription();

  constructor(
    private sensorDataService: SensorDataService,
    private renderer: Renderer2,
    private sensorDataSocketService: SensorDataSocketService
  ) {}

  ngOnInit(): void {
    this.sub.add(
      this.sensorDataSocketService
        .init()
        .pipe(
          switchMap(() =>
            merge(
              this.sensorDataSocketService.on('init'),
              this.sensorDataSocketService.on('disconnect'),
              this.sensorDataSocketService.on('roomJoined'),
              this.sensorDataSocketService.on('roomLeft')
            )
          )
        )
        .subscribe((message) => {
          console.log('[Client SensorData]', message);
        })
    );

    
    this.sub.add(
      this.sensorDataSocketService
        .on<SensorData>('newSensorData')
        .subscribe({
          next: (sensorData) => {
            const groundHumidityPoint: ChartPoint = {
              x: parseISO(sensorData.createdAt),
              y: sensorData.groundHumidity,
            };
            const airHumidityPoint: ChartPoint = {
              x: parseISO(sensorData.createdAt),
              y: sensorData.airHumidity,
            };
            const temperaturePoint: ChartPoint = {
              x: parseISO(sensorData.createdAt),
              y: sensorData.temperature,
            };
            
            (this.charts.get(sensorData.sensorId)
              .data.datasets[0].data as ChartPoint[]).push(groundHumidityPoint);
            (this.charts.get(sensorData.sensorId)
              .data.datasets[1].data as ChartPoint[]).push(airHumidityPoint);
            (this.charts.get(sensorData.sensorId)
              .data.datasets[2].data as ChartPoint[]).push(temperaturePoint);

            this.charts.get(sensorData.sensorId).update();
          }
        })
    );
  }

  ngAfterViewInit() {
    this.sensorDataService.getAllDataByUser().subscribe({
      next: (sensorData) => {
        const grpBy = values(groupBy(sensorData, 'sensorId'));

        grpBy.forEach((el) => {
          const chart = this.generateNewChart();

          let groundHumidity: ChartPoint[] = [];
          let airHumidity: ChartPoint[] = [];
          let temperature: ChartPoint[] = [];

          el.forEach((sensorData) => {
            const groundHumidityPoint: ChartPoint = {
              x: parseISO(sensorData.createdAt),
              y: sensorData.groundHumidity,
            };
            const airHumidityPoint: ChartPoint = {
              x: parseISO(sensorData.createdAt),
              y: sensorData.airHumidity,
            };
            const temperaturePoint: ChartPoint = {
              x: parseISO(sensorData.createdAt),
              y: sensorData.temperature,
            };

            groundHumidity.push(groundHumidityPoint);
            airHumidity.push(airHumidityPoint);
            temperature.push(temperaturePoint);
          });

          const ground_humidity_color = this.getRandomColor();
          const dataset_ground_humidity: ChartDataSets = {
            label: 'Ground humidity',
            data: groundHumidity,
            backgroundColor: ground_humidity_color,
            borderColor: ground_humidity_color,
            fill: false,
          };

          const air_humidity_color = this.getRandomColor();
          const dataset_air_humidity: ChartDataSets = {
            label: 'Air humidity',
            data: airHumidity,
            backgroundColor: air_humidity_color,
            borderColor: air_humidity_color,
            fill: false,
          };

          const temperature_color = this.getRandomColor();
          const dataset_temperature: ChartDataSets = {
            label: 'Temperature',
            data: temperature,
            backgroundColor: temperature_color,
            borderColor: temperature_color,
            fill: false,
          };

          chart.data.datasets.push(
            dataset_ground_humidity,
            dataset_air_humidity,
            dataset_temperature
          );
          chart.update();
          this.charts.set(el[0].sensorId, chart);
        });
      },
    });
  }

  ngOnDestroy() {
    this.sensorDataSocketService.disconnect();
    this.sub.unsubscribe();
  }

  generateNewChart() {
    const divEl = this.renderer.createElement('div');
    this.renderer.setStyle(divEl, 'position', 'relative');

    const canvasEl = this.renderer.createElement('canvas');
    this.renderer.setProperty(canvasEl, 'height', 500);

    this.renderer.appendChild(this.canvasList.nativeElement, divEl);
    this.renderer.appendChild(divEl, canvasEl);
    return new Chart(canvasEl, {
      type: 'line',
      data: null,
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
                y: null,
              },
              // Format of max pan range depends on scale type
              rangeMax: {
                x: null,
                y: null,
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
                y: null,
              },
              // Format of max zoom range depends on scale type
              rangeMax: {
                x: null,
                y: null,
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

  private getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
}
