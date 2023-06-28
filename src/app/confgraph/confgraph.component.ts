import { Component } from "@angular/core";
import { formatDate, getLocaleId } from "@angular/common";
import { ConfDataService } from "../confdata/confdata.service";
import { BubbleDataPoint, ChartConfiguration, TooltipItem } from "chart.js";
import "chartjs-adapter-date-fns";

interface ConfData {
  confDate: Date;
  name: string;
  location: string;
  numberOfWomen: number;
  numberOfMen: number;
  dateAdded: Date;
  year: number;
  totalSpeakers: number;
  diversityPercentage: number;
}

@Component({
  selector: "app-confgraph",
  templateUrl: "./confgraph.component.html",
  styleUrls: ["./confgraph.component.css"],
})
export class ConfgraphComponent {
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
  download() {
    this.confDataService
      .getTextFile("TechConfSpeakers")
      .subscribe((results) => this.createChartPoints(JSON.parse(results)));
  }
  createChartPoints(rawData: Object[]) {
    rawData.forEach((rawConfData: Object) => {
      var confData = rawConfData as ConfData;
      switch (true) {
        case confData.diversityPercentage < 0.1:
          this.addChartPointToCohort(this.chartPoints1, confData);
          break;
        case confData.diversityPercentage < 0.2:
          this.addChartPointToCohort(this.chartPoints2, confData);
          break;
        case confData.diversityPercentage < 0.3:
          this.addChartPointToCohort(this.chartPoints3, confData);
          break;
        case confData.diversityPercentage < 0.4:
          this.addChartPointToCohort(this.chartPoints4, confData);
          break;
        case confData.diversityPercentage < 0.5:
          this.addChartPointToCohort(this.chartPoints5, confData);
          break;
        default:
          this.addChartPointToCohort(this.chartPoints6, confData);
          break;
      }
    });
    this.confDataLoaded = true;
  }
  addChartPointToCohort(cohort: BubbleDataPoint[], confData: ConfData) {
    cohort.push({
      ...confData,
      x: new Date(confData.confDate).getTime(),
      y: Math.round(confData.diversityPercentage * 100),
      r: (confData as ConfData).totalSpeakers / 10,
    });
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

  return `${confData.name} - ${confData.location}`;
};

const tooltipSubtitle = (context: TooltipItem<"bubble">[]) => {
  var confData = context[0].raw as ConfData;

  return `(${formatDate(
    confData.confDate,
    "d MMM YYYY",
    getLocaleId("en-AU")
  )})`;
};

const tooltipLabel = (context: TooltipItem<"bubble">) => {
  var confData = context.raw as ConfData;

  return `Diversity: ${context.parsed.y}% of ${confData.totalSpeakers} total speakers`;
};
