import { Component } from "@angular/core";
import { ConfDataService } from "./confdata.service";

@Component({
  selector: "app-confdata",
  templateUrl: "./confdata.component.html",
  styleUrls: ["./confdata.component.css"],
  providers: [ConfDataService],
})
export class ConfdataComponent {
  contents: string | undefined;
  constructor(private confDataService: ConfDataService) {}

  clear() {
    this.contents = undefined;
  }

  download() {
    this.confDataService
      .getTextFile("TechConfSpeakers")
      .subscribe((results) => (this.contents = results));
  }
}
