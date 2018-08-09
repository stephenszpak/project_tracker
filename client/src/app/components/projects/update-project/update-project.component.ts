import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Util, ProjectModel, AudienceModel, LocationModel, PlatformModel, UserModel, ProjectTypeModel } from "../../../shared";
import { MatSnackBar } from '@angular/material';
import { FormControlErrors } from '../../../shared/errors';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

export interface Projects {
  name: string;
  description: string;
  projectSponsor: string;
  executiveSponsor: string;
  productSponsor: string;
  projectType: string;
  locationsImpacted: Array<string>;
  audiencesImpacted: Array<string>;
  platformsImpacted: Array<string>;
  newPricingRules: string;
  volume: number;
  revenueAtList: number;
  dealFormEligible: string;
  newTitles: string;
  newAccounts: string;
  projectDetails: string;
  businessCase: string;
  comments: string;
}

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html'
})
export class UpdateProjectComponent implements OnInit {
  projectForm: FormGroup;
  projectInfo: Projects = <Projects>{};
  updatedProject: Projects = <Projects>{};
  locations: Array<LocationModel> = [];
  audiences: Array<AudienceModel> = [];
  platforms: Array<PlatformModel> = [];
  url_params;
  users: Array<UserModel> = [];
  projectTypes: Array<ProjectTypeModel> = [];
  currentUser: any;
  usersOptions = [];
  filteredOptions: Observable<string[]>;

  project: any = {
    name: '',
    description: '',
    projectSponsor: '',
    executiveSponsor: '',
    productSponsor: '',
    projectType: '',
    locationsImpacted: '',
    audiencesImpacted: '',
    platformsImpacted: '',
    newPricingRules: '',
    volume: '',
    revenueAtList: '',
    dealFormEligible: '',
    newTitles: '',
    newAccounts: '',
    projectDetails: '',
    businessCase: '',
    comments: '',
  };

  constructor(
    private aRoute: ActivatedRoute,
    public snackBar: MatSnackBar,
    private notify: ToastrService,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  createForm() {
    this.projectForm = this.fb.group({
      name: [null, [Validators.required]],
      description: null,
      projectSponsor: null,
      executiveSponsor: null,
      productSponsor: null,
      projectType: null,
      locationsImpacted: new FormControl([null]),
      audiencesImpacted: new FormControl([null]),
      platformsImpacted: new FormControl([null]),
      newPricingRules: null,
      volume: null,
      revenueAtList: null,
      dealFormEligible: null,
      newTitles: null,
      newAccounts: null,
      projectDetails: null,
      businessCase: null,
      comments: null
    });
  }

  filter(val: string): string[] {
    return this.usersOptions.filter(fil => fil.toLowerCase().includes(val.toLowerCase()));
  }

  ngOnInit() {
    this.loadExistingProject();
    this.loadLocations();
    this.loadPlatforms();
    this.loadAudiences();
    this.loadProjectTypes();
    this.loadUsers();
  }

  async loadExistingProject() {
    this.url_params = await Util.getUrlParams(this.aRoute);
    this.project = await ProjectModel.findById(this.url_params.id)
    // console.log('loaded project', this.project);

    // populate form
    this.projectForm = this.fb.group({
      name: this.project.name,
      description: this.project.description,
      projectSponsor: this.project.projectSponsor,
      executiveSponsor: this.project.executiveSponsor,
      productSponsor: this.project.productSponsor,
      projectType: this.project.projectType,
      locationsImpacted: [this.project.locationsImpacted],
      audiencesImpacted: [this.project.audiencesImpacted],
      platformsImpacted: [this.project.platformsImpacted],
      newPricingRules: this.project.newPricingRules,
      volume: this.project.volume,
      revenueAtList: this.project.revenueAtList,
      dealFormEligible: this.project.dealFormEligible,
      newTitles: this.project.newTitles,
      newAccounts: this.project.newAccounts,
      projectDetails: this.project.projectDetails,
      businessCase: this.project.businessCase,
      comments: this.project.comments
    });
  }

  async loadLocations() {
    this.locations = await LocationModel.getAllLocations();
    let vals = new Array(this.locations.length);
    for (let i = 0; i < this.locations.length; i++) {
      vals[i] = {
        value: this.locations[i].name,
        viewValue: this.locations[i].name
      };
    }
    this.locations = vals.slice(0);
  }

  async loadPlatforms() {
    this.platforms = await PlatformModel.getAllPlatforms();
    let vals = new Array(this.platforms.length);
    for (let i = 0; i < this.platforms.length; i++) {
      vals[i] = {
        value: this.platforms[i].name,
        viewValue: this.platforms[i].name
      };
    }
    this.platforms = vals.slice(0);
  }

  async loadProjectTypes() {
    this.projectTypes = await ProjectTypeModel.getAllProjectTypes();
    let vals = new Array(this.projectTypes.length);
    for (let i = 0; i < this.projectTypes.length; i++) {
      vals[i] = {
        value: this.projectTypes[i].name,
        viewValue: this.projectTypes[i].name
      };
    }
    this.projectTypes = vals.slice(0);
  }

  async loadAudiences() {
    this.audiences = await AudienceModel.getAllAudiences();
    let vals = new Array(this.audiences.length);
    for (let i = 0; i < this.audiences.length; i++) {
      vals[i] = {
        value: this.audiences[i].name,
        viewValue: this.audiences[i].name
      };
    }
    this.audiences = vals.slice(0);
  }

  async loadUsers() {
    this.users = await UserModel.getAllUsers();
    let vals = new Array(this.users.length);
    for (let i = 0; i < this.users.length; i++) {
      vals[i] = {
        value: this.users[i].firstName + ' ' + this.users[i].lastName,
        viewValue: this.users[i].firstName + ' ' + this.users[i].lastName
      };
      this.usersOptions.push(this.users[i].firstName + ' ' + this.users[i].lastName);

    }
    this.users = vals.slice(0);
    this.projectForm.controls.executiveSponsor.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
    this.projectForm.controls.productSponsor.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
  }

  get f() { return this.projectForm.controls; }

  async onSubmit() {
    this.updatedProject = {
      name: this.f.name.value,
      description: this.f.description.value,
      projectSponsor: this.f.projectSponsor.value,
      executiveSponsor: this.f.executiveSponsor.value,
      productSponsor: this.f.productSponsor.value,
      projectType: this.f.projectType.value,
      locationsImpacted: [this.f.locationsImpacted.value],
      audiencesImpacted: [this.f.audiencesImpacted.value],
      platformsImpacted: [this.f.platformsImpacted.value],
      newPricingRules: this.f.newPricingRules.value,
      volume: this.f.volume.value,
      revenueAtList: this.f.revenueAtList.value,
      dealFormEligible: this.f.dealFormEligible.value,
      newTitles: this.f.newTitles.value,
      newAccounts: this.f.newAccounts.value,
      projectDetails: this.f.projectDetails.value,
      businessCase: this.f.businessCase.value,
      comments: this.f.comments.value
    };
    let err, res;
    [err, res] = await Util.to(this.project.saveAPI(this.updatedProject));
    if (err) {
      if (err.message == 'Nothing Updated') this.snackBar.open('Project', 'Nothing to Update', { duration: 2000 });
      return;
    }
    if (!err) this.notify.success('Project Updated');
    setTimeout(() => { ProjectModel.to('projects') }, 2000);
  }



  matcher = new FormControlErrors();
}
