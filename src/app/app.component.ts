import { Component } from "@angular/core";
import { ConfDataService } from "./confdata/confdata.service";
import {
  BubbleDataPoint,
  Chart,
  ChartConfiguration,
  TooltipItem,
} from "chart.js";
import "chartjs-adapter-date-fns";

class ConfData {
  confDate: Date = new Date();
  name: string = "";
  location: string = "";
  numberOfWomen: number = 0;
  numberOfMen: number = 0;
  dateAdded: Date = new Date();
  year: number = 0;
  totalSpeakers: number = 0;
  diversityPercentage: number = 0;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [ConfDataService],
})
export class AppComponent {
  title = "xxtechconfspeakers-fe";
  chartPoints: BubbleDataPoint[] = [];
  chartPoints1: BubbleDataPoint[] = [];
  confDataLoaded = false;

  constructor(private confDataService: ConfDataService) {
    this.download();
  }

  createChartPoints(rawData: Object[]) {
    rawData.forEach((confData: Object, _i: number) => {
      this.chartPoints.push({
        ...confData,
        x: new Date((confData as ConfData).confDate).getTime(),
        y: Math.round((confData as ConfData).diversityPercentage * 100),
        r: (confData as ConfData).totalSpeakers / 10,
      });
    });

    this.chartPoints1 = this.chartPoints.filter(
      (point) => point.y >= 30 && point.y <= 40
    );
    console.log(this.chartPoints1.length);
    console.log(this.chartPoints1[0]);
    console.log(this.chartPoints[0]);
    console.log(this.chartPoints[0] == this.chartPoints1[0]);
    this.confDataLoaded = true;
  }

  download() {
    this.confDataService
      .getTextFile("TechConfSpeakers")
      .subscribe((results) => this.createChartPoints(JSON.parse(results)));
  }

  public bubbleChartOptions: ChartConfiguration<"bubble">["options"] = {
    responsive: true,
    scales: {
      y: {
        grid: { color: "#565656" },
        ticks: {
          color: "#000000",
          callback: function (value) {
            return value + "%";
          },
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: "#000000",
          autoSkip: true,
        },
        type: "time",
        time: {
          unit: "year",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        color: "#000000",
        font: { size: 14 },
        text: "Diversity over time",
      },
      legend: {
        position: "bottom",
        title: {
          color: "rgb(255, 255, 255)",
        },
        labels: {
          color: "rgb(255, 255, 255)",
        },
      },
      tooltip: {
        displayColors: false,
        titleAlign: "center",
        callbacks: {
          label: tooltipLabel,
          title: tooltipTitle,
        },
      },
    },
  };

  public bubbleChartDatasets: ChartConfiguration<"bubble">["data"]["datasets"] =
    [
      {
        data: this.chartPoints,
        label: "0% >= diversity <= 10%",
        backgroundColor: "rgb(255, 0, 0)",
        borderColor: "rgb(0, 0, 0)",
      },
      {
        data: this.chartPoints,
        label: "10% >= diversity <= 20%",
        backgroundColor: "rgb(255, 0, 255)",
        borderColor: "rgb(0, 0, 0)",
      },
      {
        data: this.chartPoints,
        label: "20% >= diversity <= 30%",
        backgroundColor: "rgb(255, 165, 0)",
        borderColor: "rgb(0, 0, 0)",
      },
      {
        data: this.chartPoints,
        label: "30% >= diversity <= 40%",
        backgroundColor: "rgb(0, 0, 255)",
        borderColor: "rgb(0, 0, 0)",
      },
      {
        data: this.chartPoints,
        label: "40% >= diversity <= 50%",
        backgroundColor: "rgb(0, 128, 0)",
        borderColor: "rgb(0, 0, 0)",
      },
      {
        data: this.chartPoints,
        label: "50% >= diversity <= 100%",
        backgroundColor: "rgb(255, 255, 255)",
        borderColor: "rgb(0, 0, 0)",
      },
    ];
}

const tooltipTitle = (context: TooltipItem<"bubble">[]) => {
  var confData = context[0].raw as ConfData;
  var label = `${confData.name} - ${confData.location}`;

  return label;
};

const tooltipLabel = (context: TooltipItem<"bubble">) => {
  var confData = context.raw as ConfData;
  var label = `Diversity: ${context.parsed.y}% of ${confData.totalSpeakers} total speakers`;

  return label;
};
