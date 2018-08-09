import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Util, ProjectModel, AudienceModel, LocationModel, PlatformModel, UserModel, ProjectTypeModel } from "../../../shared";
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

export interface Projects {
  id: string,
  name: string;
  description: string;
  projectSponsor: string;
  executiveSponsor: string;
  productSponsor: string;
  projectType: string;
  locationsImpacted: string;
  audiencesImpacted: string;
  platformsImpacted: string;
  newPricingRules: string;
  volume: number;
  revenueAtList: number;
  dealFormEligible: string;
  newTitles: string;
  newAccounts: string;
  projectDetails: string;
  businessCase: string;
  comments: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  providers: [
    { provide: 'Window', useValue: window }
  ]
})
export class ViewProjectComponent implements OnInit {
  projectInfo: Projects = <Projects>{};
  url_params;

  constructor(
    @Inject('Window') private window: Window,
    private aRoute: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.url_params = await Util.getUrlParams(this.aRoute);
    this.projectInfo = await ProjectModel.findById(this.url_params.id)

    console.log('single', this.projectInfo);
  }

  private captureScreen() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 305;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(this.projectInfo.name); // Generated PDF
    });
  }

  public capture2() {
    var pdf;
    var data = document.getElementById('contentToConvert');
    var doc = new jspdf('p', 'mm', 'a4');
    doc.addHTML(data, () => {
      doc.save(this.projectInfo.name);
    });
  }

}
