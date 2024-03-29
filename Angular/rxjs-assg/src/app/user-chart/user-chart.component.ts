import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../user';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

interface ChartData {
  type: string;
  name: string;
  showInLegend: boolean;
  color: string;
  dataPoints: { y: number; label: string }[];
}

@Component({
  selector: 'app-user-chart',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './user-chart.component.html',
  styleUrl: './user-chart.component.css',
})
export class UserChartComponent implements OnChanges {
  @Input() chartUsers: User[] | null = [];

  likeDataPoints: { y: number; label: string }[] = [];
  shareDataPoints: { y: number; label: string }[] = [];
  subscribeDataPoints: { y: number; label: string }[] = [];

  chartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: 'User Engagement Metrics',
      fontFamily: 'Calibri, Arial, sans-serif',
    },
    axisX: {
      title: 'Users',
      reversed: true,
    },
    axisY: {
      title: 'Metrics',
      includeZero: true,
    },
    toolTip: {
      shared: true,
    },
    data: [] as ChartData[],
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartUsers'] && changes['chartUsers'].currentValue) {
      this.updateDataPoints();
    }
  }

  private updateDataPoints() {
    this.likeDataPoints = [];
    this.shareDataPoints = [];
    this.subscribeDataPoints = [];

    if (this.chartUsers) {
      this.chartUsers.forEach((user) => {
        this.likeDataPoints.push({ y: user.likeCount, label: user.name });
        this.shareDataPoints.push({ y: user.shareCount, label: user.name });
        this.subscribeDataPoints.push({
          y: user.subscribeCount,
          label: user.name,
        });
      });
    }

    this.updateChartOptions();
  }

  private updateChartOptions(): void {
    const data = [
      {
        type: 'stackedBar',
        name: 'Like',
        showInLegend: true,
        color: '#3f51b5',
        dataPoints: this.likeDataPoints,
      },
      {
        type: 'stackedBar',
        name: 'Share',
        showInLegend: true,
        color: '#ff4081',
        dataPoints: this.shareDataPoints,
      },
      {
        type: 'stackedBar',
        name: 'Subscribe',
        showInLegend: true,
        color: '#f44336',
        dataPoints: this.subscribeDataPoints,
      },
    ];

    this.chartOptions = { ...this.chartOptions, data };
  }
}
