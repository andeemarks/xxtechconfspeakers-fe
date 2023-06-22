import { Component } from "@angular/core";
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
  chartPoints: BubbleDataPoint[] = [];
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
      x: {
        type: "time",
        time: {
          displayFormats: {
            year: "YYYY",
          },
        },
      },
    },
    plugins: {
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
        label: "Conference",
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
  var displayDiversityPercentage = Math.round(
    confData.diversityPercentage * 100
  );
  var label = `Diversity: ${displayDiversityPercentage}% of ${confData.totalSpeakers} total speakers`;

  return label;
};
