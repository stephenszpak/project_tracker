import { Model } from 'browser-model';

import { API } from '../helpers/api.helper';
import { Util } from '../helpers/util.helper';

export class ProjectModel extends Model {
  apiUpdateValues: Array<string> = ['name', 'description', 'projectSponsor', 'executiveSponsor', 'productSponsor', 'projectType', 'locationsImpacted', 'audiencesImpacted', 'platformsImpacted', 'newPricingRules', 'volume', 'revenueAtList', 'dealFormEligible', 'newTitles', 'newAccounts', 'projectDetails', 'businessCase', 'comments',
   'createdAt', 'updatedAt'];

  id;
  name;
  description;
  projectSponsor;
  executiveSponsor;
  productSponsor;
  projectType;
  locationsImpacted;
  audiencesImpacted;
  platformsImpacted;
  newPricingRules;
  volume;
  revenueAtList;
  dealFormEligible;
  newTitles;
  newAccounts;
  projectDetails;
  businessCase;
  comments;
  createdAt;
  updatedAt;

  static SCHEMA = {
    id: { type: 'string', primary: true },//this means every time you make a new object you must give it a _id
    name: { type: 'string' },
    description: { type: 'string' },
    projectSponsor: { type: 'string' },
    executiveSponsor: { type: 'string' },
    productSponsor: { type: 'string' },
    projectType: { type: 'string' },
    locationsImpacted: { type: 'string' },
    audiencesImpacted: { type: 'string' },
    platformsImpacted: { type: 'string' },
    newPricingRules: { type: 'boolean' },
    volume: { type: 'number' },
    revenueAtList: { type: 'number' },
    dealFormEligible: { type: 'boolean' },
    newTitles: { type: 'string' },
    newAccounts: { type: 'string' },
    projectDetails: { type: 'string' },
    businessCase: { type: 'string' },
    comments: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  };

  constructor(obj: object) {
    super(obj);

  }
  to(action) {
    return Util.route('/projects/' + action + '/' + this.id);
  }

  // TODO:this SHOULD be the update function, not working, why?
  // NOTE: -- possible async problem
  // NOTE: -- there is a delay on updates showing in the front end, the DB gets updated but it takes some time for the front end to show updated values 7/26/2018
  async saveAPI(projectInfo: any) {
    return API.save(this, '/api/projects/' + this.id, projectInfo);
  }

  async removeProject() {
    return API.remove(this, '/api/projects/' + this.id);
  }

  static to(action) {
    return Util.route(action);
  }

  static async getAllProjects() {
    let err, res;
    [err, res] = await Util.to(Util.get('/api/projects'));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let projects = []
    for (let i in res.projects) {
      let projectInfo = res.projects[i];
      let project = this.resCreate(projectInfo);
      projects.push(project);
    }
    // console.log('projects in model: ', projects)
    return projects;
  }

  static async getAPI() {
    let err, res;
    [err, res] = await Util.to(Util.get('/api/projects'))
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let project
  }

  static resCreate(resProject) {//create project instance from a project response
    let project = this.findById(resProject.id);
    if (project) return project;
    let projectInfo = resProject;
    projectInfo.id = resProject.id;

    project = this.create(projectInfo);
    return project;
  }

  // TODO: figure out why the updates are not working -- is it an async problem? are arrays getting loaded to fast?
  // NOTE: this is just a test function to see if i could make updates work -- this is NOT the update i want to use
  static async UpdateProject(projectInfo: any, id: string) {
    let err, res;
    [err, res] = await Util.to(Util.put('/api/projects/' + id, projectInfo));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);
    let project = this.resCreate(res.project);
    console.log('update project', project)
    project.emit(['updated'], projectInfo, true);
    return project;
  }

  static async CreateAPI(projectInfo: any) {
    let err, res;
    [err, res] = await Util.to(Util.post('/api/projects', projectInfo));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);
    let project = this.resCreate(res.project);
    console.log('created project', project)
    project.emit(['newly-created'], projectInfo, true);
    return project;
  }

  static async getById(id: string) {
    let project = this.findById(id);
    if (project) return project;

    let err, res; //get from API
    [err, res] = await Util.to(Util.get('/api/projects/' + id));
    if (err) Util.throwErr(err.message, true);
    if (!res.success) Util.throwErr(res.error, true);

    let projectInfo = res.project;
    project = this.resCreate(res.project);
    console.log('get by id project: ', project)
    return project;
  }
}
