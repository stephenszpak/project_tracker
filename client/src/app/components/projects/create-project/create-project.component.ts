import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Util, ProjectModel, AudienceModel, LocationModel, PlatformModel, ProjectTypeModel, UserModel } from "../../../shared";
import { MatSnackBar } from '@angular/material';
import { FormControlErrors } from '../../../shared/errors';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as jspdf from 'jspdf';

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
  dealFormEligible: boolean;
  newTitles: string;
  newAccounts: string;
  projectDetails: string;
  businessCase: string;
  comments: string;
}

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html'
})
export class CreateProjectComponent implements OnInit {
  projectForm: FormGroup;
  projectInfo: Projects = <Projects>{};
  locations: Array<LocationModel> = [];
  audiences: Array<AudienceModel> = [];
  platforms: Array<PlatformModel> = [];
  users: Array<UserModel> = [];
  projectTypes: Array<ProjectTypeModel> = [];
  currentUser: any;
  usersOptions = [];
  filteredOptions: Observable<string[]>;

  constructor(
    public snackBar: MatSnackBar,
    private notify: ToastrService,
    private fb: FormBuilder
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
      locationsImpacted: null,
      audiencesImpacted: null,
      platformsImpacted: null,
      newPricingRules: null,
      volume: [null, [Validators.required]],
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

  async ngOnInit() {
    this.currentUser = await UserModel.getCurrentUser();
    this.loadLocations();
    this.loadPlatforms();
    this.loadAudiences();
    this.loadUsers();
    this.loadProjectTypes();
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

  async onSubmit() {
    this.projectInfo = this.prepareForm();

    let err, project;
    [err, project] = await Util.to(ProjectModel.CreateAPI(this.projectInfo));
    if (!err) this.notify.success('Project Created');
    
    setTimeout(() => { ProjectModel.to('projects') }, 2000);
  }

  prepareForm(): Projects {
    const formValues = this.projectForm.value;
    const saveProject: any = {
      name: formValues.name,
      description: formValues.description,
      projectSponsor: this.currentUser.firstName + ' ' + this.currentUser.lastName,
      executiveSponsor: formValues.executiveSponsor,
      productSponsor: formValues.productSponsor,
      projectType: formValues.projectType,
      locationsImpacted: formValues.locationsImpacted,
      platformsImpacted: formValues.platformsImpacted,
      audiencesImpacted: formValues.audiencesImpacted,
      newPricingRules: formValues.newPricingRules,
      volume: formValues.volume,
      revenueAtList: formValues.revenueAtList,
      dealFormEligible: formValues.dealFormEligible,
      newTitles: formValues.newTitles,
      newAccounts: formValues.newAccounts,
      projectDetails: formValues.projectDetails,
      businessCase: formValues.businessCase,
      comments: formValues.comments
    };
    return saveProject;
  }

  matcher = new FormControlErrors();
}
