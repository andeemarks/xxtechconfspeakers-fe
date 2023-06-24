import { Component } from "@angular/core";
import { formatDate, getLocaleId } from "@angular/common";
import { ConfDataService } from "./confdata/confdata.service";
import { BubbleDataPoint, ChartConfiguration, TooltipItem } from "chart.js";
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
  chartPoints1: BubbleDataPoint[] = [];
  chartPoints2: BubbleDataPoint[] = [];
  chartPoints3: BubbleDataPoint[] = [];
  chartPoints4: BubbleDataPoint[] = [];
  chartPoints5: BubbleDataPoint[] = [];
  chartPoints6: BubbleDataPoint[] = [];
  confDataLoaded = false;

  constructor(private confDataService: ConfDataService) {
    this.download();
  }

  createChartPoints(rawData: Object[]) {
    rawData.forEach((rawConfData: Object, _i: number) => {
      var confData = rawConfData as ConfData;
      var chartPoints = this.composeConfData(confData);
      switch (true) {
        case confData.diversityPercentage < 0.1:
          this.chartPoints1.push(chartPoints);
          break;
        case confData.diversityPercentage < 0.2:
          this.chartPoints2.push(chartPoints);
          break;
        case confData.diversityPercentage < 0.3:
          this.chartPoints3.push(chartPoints);
          break;
        case confData.diversityPercentage < 0.4:
          this.chartPoints4.push(chartPoints);
          break;
        case confData.diversityPercentage < 0.5:
          this.chartPoints5.push(chartPoints);
          break;
        default:
          this.chartPoints6.push(chartPoints);
          break;
      }
    });

    this.confDataLoaded = true;
  }

  composeConfData(confData: ConfData) {
    return {
      ...confData,
      x: new Date(confData.confDate).getTime(),
      y: Math.round(confData.diversityPercentage * 100),
      r: (confData as ConfData).totalSpeakers / 10,
    };
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
          afterTitle: tooltipSubtitle,
        },
      },
    },
  };

  public bubbleChartDatasets: ChartConfiguration<"bubble">["data"]["datasets"] =
    [
      {
        data: this.chartPoints1,
        label: "0% >= diversity <= 10%",
        backgroundColor: "rgb(255, 0, 0)",
        borderColor: "rgb(255, 0, 0)",
      },
      {
        data: this.chartPoints2,
        label: "10% >= diversity <= 20%",
        backgroundColor: "rgb(255, 0, 255)",
        borderColor: "rgb(255, 0, 255)",
      },
      {
        data: this.chartPoints3,
        label: "20% >= diversity <= 30%",
        backgroundColor: "rgb(255, 165, 0)",
        borderColor: "rgb(255, 165, 0)",
      },
      {
        data: this.chartPoints4,
        label: "30% >= diversity <= 40%",
        backgroundColor: "rgb(0, 0, 255)",
        borderColor: "rgb(0, 0, 255)",
      },
      {
        data: this.chartPoints5,
        label: "40% >= diversity <= 50%",
        backgroundColor: "rgb(0, 128, 0)",
        borderColor: "rgb(0, 128, 0)",
      },
      {
        data: this.chartPoints6,
        label: "50% >= diversity <= 100%",
        backgroundColor: "rgb(255, 255, 255)",
        borderColor: "rgb(255, 255, 255)",
      },
    ];
}

const tooltipTitle = (context: TooltipItem<"bubble">[]) => {
  var confData = context[0].raw as ConfData;
  var label = `${confData.name} - ${confData.location}`;

  return label;
};

const tooltipSubtitle = (context: TooltipItem<"bubble">[]) => {
  var confData = context[0].raw as ConfData;
  var label = `(${formatDate(
    confData.confDate,
    "d MMM YYYY",
    getLocaleId("en-AU")
  )})`;

  return label;
};

const tooltipLabel = (context: TooltipItem<"bubble">) => {
  var confData = context.raw as ConfData;
  var label = `Diversity: ${context.parsed.y}% of ${confData.totalSpeakers} total speakers`;

  return label;
};
